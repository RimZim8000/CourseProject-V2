using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Documents;
using CourseProject2018.Models;
using CourseProject2018.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CourseProject2018.Controllers
{
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private IdocdbRepository<Product> _repository;
        public ProductsController(IdocdbRepository<Product> repository)
        {
            _repository = repository;
            _repository.Initialize("Products");
        }
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
        // GET: api/products
        [HttpGet]
        public async Task<IEnumerable<Product>> GetProducts()
        {
            UserInfo u = getLoggedInUserInfo();
            if (u != null)
            {
                IEnumerable<Product> lstItems = await _repository.GetDocsAsync("usergoogid='" + u.usergoogid + "'");
                return lstItems;
            }
            return null;
        }

        // GET api/products/1
        [HttpGet("{id}")]
        public async Task<Document> Get(string id)
        {
            UserInfo u = getLoggedInUserInfo();
            if (u != null)
            {
                var retObj = await _repository.GetAsync(u.usergoogid, id);
                return retObj;
            }
            else
                return null;
        }
        // POST api/products
        [HttpPost]
        public async Task<Document> Post(Product product)
        {
            UserInfo u = getLoggedInUserInfo();
            if (u != null)
            {
                var document = await _repository.CreateAsync(u.usergoogid, product);
                return document;
            }
            return null;
        }

        // PUT api/products/5
        [HttpPut("{id}")]
        public async Task<Document> Put(string id)
        {
            UserInfo u = getLoggedInUserInfo();
            if (u != null)
            {

                var product = new Product
                {
                    Id = id,
                    Model = "IPhone",
                    Description = "9"
                };
                var document = await _repository.UpdateAsync(u.usergoogid, id, product);
                return document;
            }
            return null;
        }

        // DELETE api/products/5
        [HttpDelete("{id}")]
        public async Task Delete(string id)
        {
            UserInfo u = getLoggedInUserInfo();
            if (u != null)
            {
                await _repository.DeleteAsync(u.usergoogid, id);
            }
        }
    }
}
