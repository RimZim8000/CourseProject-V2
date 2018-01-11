using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CourseProject2018.Models;
using CourseProject2018.Repositories;
using Microsoft.Azure.Documents;
using Stripe;

namespace CourseProject2018.Controllers
{
    //[Produces("application/json")]
    //[Route("api/Orders")]
    public class OrdersController : Controller
    {

        private IdocdbRepository<Order> _repository;
        public OrdersController(IdocdbRepository<Order> repository)
        {
            _repository = repository;
            _repository.Initialize("OrdersTable");
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
        // GET: api/Orders
        [HttpGet("~/getuserorders")]
        public async Task<IEnumerable<Order>> GetOrders()
        {
            UserInfo u = getLoggedInUserInfo();
            if (u != null)
            {
                IEnumerable<Order> lstItems = await _repository.GetDocsAsync("usergoogid='" + u.usergoogid + "'");
                return lstItems;
            }
            return null;
        }

        // GET: api/Order/5
        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<Document> GetOrder(string id)
        {
            var retObject = await _repository.GetAsync(id);
            return retObject;
        }

        // POST api/Orders
        [HttpPost("~/createneworder")]
        public async Task<Document> CreateNewOrder([FromBody]Order inObj)
        {
            //Contact retObj = await _repository.GetAsync("1");
            UserInfo u = getLoggedInUserInfo();
            if (u != null)
            {
                
                // not post the incoming obj.
                inObj.usergoogid = u.usergoogid;
                var document = await _repository.CreateAsync(u.usergoogid, inObj);
                return document;
            }
            return null;
        }
        [HttpGet("~/forceGotoMain")]
        public void forceGotoMain()
        {
            Response.Redirect("~/products");
        }
        // PUT api/Orders/5
        [HttpPut("~/saveorder/{id}")]
        public async Task<Document> saveorder(string id, [FromBody]Order inObj)
        {
            UserInfo u = getLoggedInUserInfo();
            if (u != null)
            {
                inObj.usergoogid = u.usergoogid;
                var document = await _repository.UpdateAsync(u.usergoogid, id, inObj);
                return document;
            }
            return null;
        }

        // DELETE api/Orders/5
        [HttpDelete("{id}")]
        public async Task Delete(string id)
        {
            UserInfo u = getLoggedInUserInfo();
            if (u != null)
            {
                await _repository.DeleteAsync(u.usergoogid, id);
            }
        }
        [HttpGet("~/charge")]
        public async Task Charge(string email, string token, int amount, string orderid)
        {
            QueryString q = Request.QueryString;
            var custService = new StripeCustomerService(""); 
            var chargeService = new StripeChargeService("");

            var customer = custService.Create(new StripeCustomerCreateOptions { Email = email, SourceToken = token });
            var chargeCreateOptions = new StripeChargeCreateOptions { Amount = amount, Description = "example charge using Stripe", Currency = "USD", CustomerId = customer.Id };
            //var chargeCreateOptions = new StripeChargeCreateOptions { SourceTokenOrExistingSourceId = token, Amount = 500, Description = "example charge using Stripe", Currency = "USD" };
            var charge = chargeService.Create(chargeCreateOptions);
            if (charge != null)
            {
                UserInfo currentUser = getLoggedInUserInfo();
                string hostName = (HttpContext.Request.IsHttps) ? "https://" : "http://";
                hostName += HttpContext.Request.Host.Value;
                await Utility.Utility.SendPurchaseConfirmationEmail(hostName, currentUser, email, amount); 
            }
            
        }

    }
}
