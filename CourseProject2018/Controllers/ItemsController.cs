using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CourseProject2018.Repositories;
using CourseProject2018.Models;
using Microsoft.Azure.Documents;

namespace CourseProject2018.Controllers
{
    //[Produces("application/json")]
    //[Route("api/Items")]
    public class ItemsController : Controller
    {
        private Items _repository;
        public ItemsController()
        {
            _repository = new Items();
        }
        // GET: api/Items
        [HttpGet("~/api/Items")]
        public IEnumerable<Item> Get()
        {
            return _repository.getAll();
        }

        // GET: api/Order/5
        [HttpGet("{id}", Name = "GetItem")]
        public Item GetItem(string id)
        {
            var retObject = _repository.Get(id);
            return retObject;
        }
        // POST: api/Items
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }
        
        // PUT: api/Items/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
