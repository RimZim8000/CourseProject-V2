using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CourseProject2018.Models;
using CourseProject2018.Repositories;
using Microsoft.Azure.Documents;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;


namespace CourseProject2018.Controllers
{
    public class SmtpOptions
    {
        public string Server { get; set; } = string.Empty;
        public int Port { get; set; } = 25;
        public string User { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public bool UseSsl { get; set; } = false;
        public bool RequiresAuthentication { get; set; } = false;
        public string PreferredEncoding { get; set; } = string.Empty;
    }
    public class EmailSender
    {
        public EmailSender()
        {
        }

        public async Task SendEmailAsync(
        SmtpOptions smtpOptions,
        string to,
        string from,
        string subject,
        string plainTextMessage,
        string htmlMessage,
        string replyTo = null)
        {
            if (string.IsNullOrWhiteSpace(to))
            {
                throw new ArgumentException("no to address provided");
            }

            if (string.IsNullOrWhiteSpace(from))
            {
                throw new ArgumentException("no from address provided");
            }

            if (string.IsNullOrWhiteSpace(subject))
            {
                throw new ArgumentException("no subject provided");
            }

            var hasPlainText = !string.IsNullOrWhiteSpace(plainTextMessage);
            var hasHtml = !string.IsNullOrWhiteSpace(htmlMessage);
            if (!hasPlainText && !hasHtml)
            {
                throw new ArgumentException("no message provided");
            }

            var m = new MimeMessage();

            m.From.Add(new MailboxAddress("", from));
            if (!string.IsNullOrWhiteSpace(replyTo))
            {
                m.ReplyTo.Add(new MailboxAddress("", replyTo));
            }
            m.To.Add(new MailboxAddress("", to));
            m.Subject = subject;

            //m.Importance = MessageImportance.Normal;
            //Header h = new Header(HeaderId.Precedence, "Bulk");
            //m.Headers.Add()

            BodyBuilder bodyBuilder = new BodyBuilder();
            if (hasPlainText)
            {
                bodyBuilder.TextBody = plainTextMessage;
            }

            if (hasHtml)
            {
                bodyBuilder.HtmlBody = htmlMessage;
            }

            m.Body = bodyBuilder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync(
                smtpOptions.Server,
                smtpOptions.Port,
                smtpOptions.UseSsl)
                .ConfigureAwait(false);

                // Note: since we don't have an OAuth2 token, disable
                // the XOAUTH2 authentication mechanism.
                client.AuthenticationMechanisms.Remove("XOAUTH2");

                // Note: only needed if the SMTP server requires authentication
                if (smtpOptions.RequiresAuthentication)
                {
                    await client.AuthenticateAsync(smtpOptions.User, smtpOptions.Password)
                    .ConfigureAwait(false);
                }

                await client.SendAsync(m).ConfigureAwait(false);
                await client.DisconnectAsync(true).ConfigureAwait(false);
            }

        }

        public async Task SendMultipleEmailAsync(
        SmtpOptions smtpOptions,
        string toCsv,
        string from,
        string subject,
        string plainTextMessage,
        string htmlMessage)
        {
            if (string.IsNullOrWhiteSpace(toCsv))
            {
                throw new ArgumentException("no to addresses provided");
            }

            if (string.IsNullOrWhiteSpace(from))
            {
                throw new ArgumentException("no from address provided");
            }

            if (string.IsNullOrWhiteSpace(subject))
            {
                throw new ArgumentException("no subject provided");
            }

            var hasPlainText = !string.IsNullOrWhiteSpace(plainTextMessage);
            var hasHtml = !string.IsNullOrWhiteSpace(htmlMessage);
            if (!hasPlainText && !hasHtml)
            {
                throw new ArgumentException("no message provided");
            }

            var m = new MimeMessage();
            m.From.Add(new MailboxAddress("", from));
            string[] adrs = toCsv.Split(',');

            foreach (string item in adrs)
            {
                if (!string.IsNullOrEmpty(item)) { m.To.Add(new MailboxAddress("", item)); ; }
            }

            m.Subject = subject;
            m.Importance = MessageImportance.High;

            BodyBuilder bodyBuilder = new BodyBuilder();
            if (hasPlainText)
            {
                bodyBuilder.TextBody = plainTextMessage;
            }

            if (hasHtml)
            {
                bodyBuilder.HtmlBody = htmlMessage;
            }

            m.Body = bodyBuilder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync(
                smtpOptions.Server,
                smtpOptions.Port,
                smtpOptions.UseSsl).ConfigureAwait(false);

                // Note: since we don't have an OAuth2 token, disable
                // the XOAUTH2 authentication mechanism.
 //               client.AuthenticationMechanisms.Remove("XOAUTH2");

                // Note: only needed if the SMTP server requires authentication
                if (smtpOptions.RequiresAuthentication)
                {
                    await client.AuthenticateAsync(
                    smtpOptions.User,
                    smtpOptions.Password).ConfigureAwait(false);
                }

                await client.SendAsync(m).ConfigureAwait(false);
                await client.DisconnectAsync(true).ConfigureAwait(false);
            }

        }

    }

    //[Produces("application/json")]
    //[Route("api/Users")]
    public class UsersController : Controller
    {
        public const int USER_RECORD_SAVED = 20;
        public const int REG_EMAIL_SENT = 30;
        public const int REG_EMAIL_RECEIVED = 40;
        public const int REG_REGISTRATION_COMPLETED = 50;

        private IdocdbRepository<UserInfo> _repository;
       public UsersController(IdocdbRepository<UserInfo> repository)
        {
            _repository = repository;
            _repository.Initialize("UserInfo");
        }
        public async Task SendConfirmationEmail(string hostName, string emailAddress, string tokenValue)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("svsaraf", "noreply@gmail.com"));
            message.To.Add(new MailboxAddress("shree", "svsaraf@yahoo.com"));
            message.Subject = "Please Confirm";
            BodyBuilder bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = "Please click on <a href='"+ hostName + "/RegistrationConfirm?token="+ tokenValue + "'>this link</a> to confirm the registration";
            message.Body = bodyBuilder.ToMessageBody();
            using (var client = new SmtpClient())
            {
                await client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTlsWhenAvailable);//465, 587
                client.AuthenticationMechanisms.Remove("XOAUTH2"); // Must be removed for Gmail SMTP
                await client.AuthenticateAsync("LernovicaMailSender@gmail.com", "M@1l$ender-Lernovica");
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
            
        }
        [HttpGet("~/signin")]
        public async Task<IActionResult> SignIn(int id)
        {
            string emailAddress = "svsaraf@yahoo.com";
            string s = HttpContext.Request.Host.Value;

            if (!User.Identity.IsAuthenticated)
            {
                return Challenge(new AuthenticationProperties { RedirectUri = "/signin" }, "Google");
            }
            else
            {
                //save the user an dthen redirect it back to the UI
                // first get the current user in the User formamt...

                UserInfo currentUser = getLoggedInUserInfo();
                UserInfo currentUserObjectFromDB = (UserInfo)(dynamic) await _repository.GetFirstDocAsync("usergoogid='"+ currentUser.usergoogid+"'");
                {
                    if (currentUserObjectFromDB == null)
                    {
                        //    /// this means that the user is authenticated but yet has not been saved in the system. 
                        //    /// So, save the user record in teh system. 
                        currentUser.regStatus = USER_RECORD_SAVED;
                        currentUserObjectFromDB = (UserInfo)(dynamic)await _repository.CreateAsync(currentUser);
                        // save one dummy record fror one contact
                    }
                    DocdbRepository<Contact> contactsRepo = new DocdbRepository<Contact>();
                    contactsRepo.Initialize("Contacts");
                    Contact c1 = (dynamic)await contactsRepo.GetFirstDocAsync("usergoogid='" + currentUser.usergoogid + "'");
                    if (c1 == null)
                    {
                        Contact c = new Contact()
                        {
                            //id = ,
                            usergoogid = currentUser.usergoogid,
                            first_name = "ZZZZZ-Dummy-first-name",
                            last_name = "ZZZZZ-Dummy-last-name",
                            email = "ZZZZZ-Dummy-email@yahoo.us",
                            subject = "ZZZZZ-Dummy-subject",
                            description = "ZZZZZ-Dummy-description"
                        };
                        await contactsRepo.CreateAsync(c);
                    }
                }
               return Redirect("/");
            }
        }
        // GET: api/Auth
        [HttpGet("~/getregistrationinfo")]
        public async Task<UserInfo> getregistrationinfo()
        {
            UserInfo currentUser = getLoggedInUserInfo();
            if(currentUser != null)
            {
                return (UserInfo) (dynamic) await  _repository.GetFirstDocAsync("usergoogid='"+currentUser.usergoogid+"'");
            }
            return currentUser;
        }

        // GET: api/Auth
        [HttpGet("~/getLoggedInUserInfo")]
        public UserInfo getLoggedInUserInfo()
        {
            if (User.Identity.IsAuthenticated)
            {
                UserInfo user = new UserInfo();
                foreach (var claim in User.Claims)
                {
                    if (claim.Type.IndexOf("/nameidentifier") >= 0)
                        user.usergoogid = claim.Value;
                    else if (claim.Type.IndexOf("/name") >= 0)
                        user.displayname = claim.Value;
                    else if (claim.Type.IndexOf("/emailaddress") >= 0)
                        user.email = claim.Value;
                }

                return user;
            }
            else
            {
                return null;
            }
        }

        [HttpGet("~/signout"), HttpPost("~/signout")]
        public IActionResult SignOut()
        {
            // Instruct the cookies middleware to delete the local cookie created
            // when the user agent is redirected from the external identity provider
            // after a successful authentication flow (e.g Google or Facebook).
            return SignOut(new AuthenticationProperties { RedirectUri = "/" },
                CookieAuthenticationDefaults.AuthenticationScheme);
        }

        
        [HttpGet("~/signin-google")]
        public async Task<IActionResult> SignIngoogle(int id)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return Challenge(new AuthenticationProperties { RedirectUri = "/signin" }, "Google");
            }
            else
            {
                return Redirect("/MyItems");
            }
        }
        // GET: api/Users
        [HttpGet]
        public async Task<IEnumerable<UserInfo>> GetUsers()
        {
            UserInfo u = getLoggedInUserInfo();
            if (u != null)
            {
                IEnumerable<UserInfo> lstItems = await _repository.GetDocsAsync("usergoogid='" + u.usergoogid + "'");
                return lstItems;
            }
            return null;
        }

        // GET: api/Users/5
        [HttpGet("{id}", Name = "Get")]
        public async Task<Document> GetUser(string id)
        {
            var retObject = await _repository.GetAsync(id);
            return retObject;
        }
        //  [HttpPut("{id}")]
        [HttpPut("~/saveregistrationinfo/{id}")]
        public async Task<Document> saveregistrationinfo(string id, [FromBody] UserInfo u)
        {

            UserInfo currentUser = getLoggedInUserInfo();
            if (currentUser != null)
            {
                currentUser = (UserInfo)(dynamic)await _repository.GetFirstDocAsync("usergoogid='"+ currentUser.usergoogid+"'");
                currentUser.regStatus = REG_EMAIL_SENT;
                currentUser.cell1 = u.cell1;
                currentUser.email2 = u.email2;
                currentUser.address1 = u.address1;
                currentUser.address2 = u.address2;
                currentUser.city = u.city;
                currentUser.state = u.state;
                currentUser.zip = u.zip;
                currentUser.mothersmaidenname = u.mothersmaidenname;
                currentUser.pet = u.pet;
                currentUser.phone = u.phone;
                string token = Guid.NewGuid().ToString();
                currentUser.token = token;
                currentUser = (UserInfo)(dynamic)await _repository.UpdateAsync(currentUser.id, currentUser);
                string hostName = (HttpContext.Request.IsHttps) ? "https://" : "http://";
                hostName += HttpContext.Request.Host.Value;
                await SendConfirmationEmail(hostName, currentUser.email, token);
            }
            return (Document)(dynamic) currentUser;
        }

        
        [HttpGet("~/RegistrationConfirm")]
        public async Task<IActionResult> RegistrationConfirm(string token)
        {
            UserInfo  currentUser = (UserInfo)(dynamic) await _repository.GetFirstDocAsync("token='" + token+"'");
            currentUser.regStatus = REG_EMAIL_RECEIVED;
            currentUser = (UserInfo)(dynamic)await _repository.UpdateAsync(currentUser.id, currentUser);
            return Redirect("/");
        }
       // DELETE api/contacts/5
        [HttpDelete("{id}")]
        public async Task Delete(string id)
        {
            UserInfo u = getLoggedInUserInfo();
            if (u != null)
            {
                UserInfo currentUser = (UserInfo)(dynamic)await _repository.GetFirstDocAsync("usergoogid = '" + u.usergoogid+ "'");
                await _repository.DeleteAsync(currentUser.usergoogid, id);
            }
        }
    }
}
