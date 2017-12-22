using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CourseProject2018.Models;
using CourseProject2018.Repositories;

namespace CourseProject2018.Controllers
{
    //[Produces("application/json")]
    [Route("api/Users")]
    public class UsersController : Controller
    {
        IUsersRepository _user;
        public UsersController(IUsersRepository u)
        {
            _user = u;
        }

        // GET: api/Users
        [HttpGet]
        public List<User> GetUsers()
        {
            return _user.GetAll();
        }

        // GET: api/Users/5
        [HttpGet("{id}", Name = "Get")]
        public User GetUser(string id)
        {
            return _user.Get(id);
        }
        
        // POST: api/Users
        [HttpPost]
        public void PostUser(User u)
        {
            _user.Post(u);
        }
        
        // PUT: api/Users/5
        [HttpPut("{id}")]
        public void PutUser(string id, User u)
        {
            _user.Put(id, u);
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void DeleteUser(string id)
        {
            _user.Delete(id);
        }
    }
}
