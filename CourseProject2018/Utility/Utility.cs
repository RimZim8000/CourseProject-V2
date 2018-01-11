using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MimeKit;
using MailKit.Net.Smtp;
using CourseProject2018.Models;
using MailKit.Security;

namespace CourseProject2018.Utility
{
    public class Utility
    {
        public static async Task SendConfirmationEmail(string hostName, UserInfo user, string tokenValue)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("svsaraf", "noreply@gmail.com"));
            message.To.Add(new MailboxAddress(user.displayname, user.email));
            message.Subject = "Please Confirm";
            BodyBuilder bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = "Please click on <a href='" + hostName + "/RegistrationConfirm?token=" + tokenValue + "'>this link</a> to confirm the registration";
            message.Body = bodyBuilder.ToMessageBody();
            using (var client = new SmtpClient())
            {
                await client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTlsWhenAvailable);//465, 587
                client.AuthenticationMechanisms.Remove("XOAUTH2"); // Must be removed for Gmail SMTP
                await client.AuthenticateAsync("LernovicaMailSender@gmail.com", "");
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
        }
        public static async Task SendPurchaseConfirmationEmail(string hostName, UserInfo user, string email2, int amount)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Learnovica", "LernovicaMailSender@gmail.com"));
            message.To.Add(new MailboxAddress(user.displayname, user.email));
            //message.To.Add(new MailboxAddress(user.displayname, email2));
            message.Subject = "Please Confirm";
            BodyBuilder bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = "Hello " + user.displayname + ", A purchase of amount $" + amount + " was made on your credit card. If this purchase was not made by you or you dispute the charges,"
                +" please contact LernovicaMailSender@gmail.com with the purchase info and amount";
            message.Body = bodyBuilder.ToMessageBody();
            using (var client = new SmtpClient())
            {
                await client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTlsWhenAvailable);//465, 587
                client.AuthenticationMechanisms.Remove("XOAUTH2"); // Must be removed for Gmail SMTP
                await client.AuthenticateAsync("LernovicaMailSender@gmail.com", "");
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
        }
    }
}
