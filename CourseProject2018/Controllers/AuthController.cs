using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace CourseProject2018.Controllers
{
    [Produces("application/json")]
    //[Route("api/Auth")]
    public class AuthController : Controller
    {
        [HttpGet("~/signin")]
        public async Task<IActionResult> SignIn(int id)
        {


            if (!User.Identity.IsAuthenticated)
            {
                return Challenge(new AuthenticationProperties { RedirectUri = "/signin" }, "Google");


            }
            else
            {
                return Redirect("/");
            }
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
        // GET: api/Auth
        [HttpGet("~/getuserinfo")]
        public IEnumerable<string> getuserinfo()
        {
            if (User.Identity.IsAuthenticated)
            {
                string s = "{";
                foreach (var claim in User.Claims) {
                    s += claim.Type +" : " + claim.Value + ", ";
                }
                s += "}";
                return new string[]  { User.Identity.Name, s  };
            }
            else
            {
                return new string[] { "", "" };
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

        
    }
}
