using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CourseProject2018.Models;
using CourseProject2018.Repositories;
using Microsoft.Azure.Documents;

namespace CourseProject2018.Controllers
{
    //[Produces("application/json")]
    [Route("api/Users")]
    public class UsersController : Controller
    {
        private IdocdbRepository<Models.User> _repository;
       public UsersController(IdocdbRepository<Models.User> repository)
        {
            _repository = repository;
            _repository.Initialize("User");
        }

        // GET: api/Users
        [HttpGet]
        public async Task<IEnumerable<Models.User>> GetUsers()
        {
            IEnumerable<Models.User> lstObjects = await _repository.GetItemsAsync<Models.User>();
            return lstObjects;
        }

        // GET: api/Users/5
        [HttpGet("{id}", Name = "Get")]
        public async Task<Models.User> GetUser(string id)
        {
            var retObject = await _repository.GetAsync(id);
            return retObject;
        }

        // POST api/user
        [HttpPost]
        public async Task<Document> Post([FromBody] Models.User inObj)
        {
            Document document = await _repository.CreateAsync( inObj);
            return document;
           
        }

        // PUT api/contacts/5
        [HttpPut("{id}")]
        public async Task<Document> Put(string id, [FromBody]Models.User inObj)
        {
            var document = await _repository.UpdateAsync(id, inObj);
            return document;
        }

        // DELETE api/contacts/5
        [HttpDelete("{id}")]
        public async Task Delete(string id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
