using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CourseProject2018.Models;
using Microsoft.Azure.Documents;
using CourseProject2018.Repositories;

namespace CourseProject2018.Controllers
{

    //[Produces("application/json")]
    [Route("api/Contacts")]
    public class ContactsController : Controller
    {
        private IdocdbRepository<Contact> _repository;
        private ContactsRepository _localContactsRepository;
        public ContactsController(IdocdbRepository<Contact> repository)
        {
            _repository = repository;
            _repository.Initialize("Contacts");
            _localContactsRepository = new ContactsRepository();
        }
        // GET: api/contacts
        [HttpGet]
        public async Task<IEnumerable<Contact>> GetContacts()
        {
            IEnumerable<Contact> lstContacts = await _repository.GetItemsAsync<Contact>();
            return lstContacts;
        }

        // GET api/contact/1
        [HttpGet("{id}")]
        public async Task<Contact> Get(string id)
        {
            var retObj = await _repository.GetAsync(id);
            return retObj;
        }

        // POST api/contacts
        [HttpPost]
        public async Task<Document> Post([FromBody]Contact inObj)
        {
            //Contact retObj = await _repository.GetAsync("1");
            bool retB = _repository.IsEmpty();
            if (retB )//|| !retObj.id.Equals("1"))
            {// if items with id=1 is not found, pill up the collection with local repo
                // hopefully, this will need to be done ony once
                foreach (var o in _localContactsRepository.GetAll())
                {
                    await _repository.CreateAsync(o);
                }
            }
            // not post the incoming obj.
            var document = await _repository.CreateAsync(inObj);
            return document;
        }

        // PUT api/contacts/5
        [HttpPut("{id}")]
        public async Task<Document> Put(string id, [FromBody]Contact inObj)
        {
            //ContactsRepository contactsRepository = new ContactsRepository();
            //Contact obj = contactsRepository.Get("1");
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
