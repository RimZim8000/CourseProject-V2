using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

//namespace CourseProject2018.Controllers
//{
//    [Produces("application/json")]
//    //[Route("api/Auth")]
//    public class AuthController : Controller
//    {
//        public object UserController { get; private set; }

//        [HttpGet("~/signin")]
//        public async Task<IActionResult> SignIn(int id)
//        {
//          if (!User.Identity.IsAuthenticated)
//            {
//                return Challenge(new AuthenticationProperties { RedirectUri = "/signin" }, "Google");
//            }
//            else
//            {
//                //save the user an dthen redirect it back to the UI
//                // first get the current user in the User formamt...
//                Models.User currentUser = getLoggedInUserInfo();
//                //UserController.GetUserInfoForAGoogleId("sss");
//                UsersController u = new UsersController();
//                Models.User currentUserDB =  await u.GetUser("sss");
//                return Redirect("/");
//            }
//        }
//        // GET: api/Auth
//        [HttpGet("~/getuserinfo")]
//        public IEnumerable<string> getuserinfo()
//        {
//            if (User.Identity.IsAuthenticated)
//            {
//                string s = "{";
//                foreach (var claim in User.Claims) {
//                    string key = "";
//                    if (claim.Type.IndexOf("/nameidentifier") >= 0)
//                        key = "usergoogleid";
//                    else if (claim.Type.IndexOf("/name") >= 0)
//                        key = "displayname";
//                    else if (claim.Type.IndexOf("/emailaddress") >= 0)
//                        key = "emailaddress";
//                    else continue;
//                    s += key +" : " + claim.Value + ", ";
//                }
//                s += "}";
//                return new string[]  { User.Identity.Name, s  };
//            }
//            else
//            {
//                return new string[] { "", "" };
//            }
//        }

//        // GET: api/Auth
//        [HttpGet("~/getLoggedInUserInfo")]
//        public Models.User getLoggedInUserInfo()
//        {
//            if (User.Identity.IsAuthenticated)
//            {
//                Models.User user = new Models.User();
//                foreach (var claim in User.Claims)
//                {
//                    if (claim.Type.IndexOf("/nameidentifier") >= 0)
//                        user.usergoogleid = claim.Value;
//                    else if (claim.Type.IndexOf("/name") >= 0)
//                        user.displayname = claim.Value;
//                    else if (claim.Type.IndexOf("/emailaddress") >= 0)
//                        user.email = claim.Value;
//                }
               
//                return user;
//            }
//            else
//            {
//                return new Models.User(); 
//            }
//        }
//        [HttpGet("~/signout"), HttpPost("~/signout")]
//        public IActionResult SignOut()
//        {
//            // Instruct the cookies middleware to delete the local cookie created
//            // when the user agent is redirected from the external identity provider
//            // after a successful authentication flow (e.g Google or Facebook).
//            return SignOut(new AuthenticationProperties { RedirectUri = "/" },
//                CookieAuthenticationDefaults.AuthenticationScheme);
//        }
//        [HttpGet("~/signin-google")]
//        public async Task<IActionResult> SignIngoogle(int id)
//        {
//            if (!User.Identity.IsAuthenticated)
//            {
//                return Challenge(new AuthenticationProperties { RedirectUri = "/signin" }, "Google");
//            }
//            else
//            {
//                return Redirect("/MyItems");
//            }
//        }
//    }
//}
