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

    [Route("api/Contacts")]
    public class ContactsController : Controller
    {
        private IdocdbRepository<Contact> _repository;
        private ContactsRepositoryInMemory _localContactsRepositoryInMemory;
        public ContactsController(IdocdbRepository<Contact> repository)
        {
            _repository = repository;
            _repository.Initialize("Contacts");
            _localContactsRepositoryInMemory = new ContactsRepositoryInMemory();
        }
        // GET: api/Auth
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
        // GET: api/contacts
        [HttpGet]
        public async Task<IEnumerable<Contact>> GetContacts()
        {
            UserInfo u = getLoggedInUserInfo();
            if (u != null)
            {
                IEnumerable<Contact> lstItems = await _repository.GetDocsAsync(u.usergoogid);
                return lstItems;
            }
            return null;
        }

        // GET api/contact/1
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

        // POST api/contacts
        [HttpPost]
        public async Task<Document> Post([FromBody]Contact inObj)
        {
            //Contact retObj = await _repository.GetAsync("1");
            UserInfo u = getLoggedInUserInfo();
            if (u != null)
            {
                bool retB = _repository.IsEmpty(u.usergoogid);
                if (retB)//|| !retObj.id.Equals("1"))
                {// if items with id=1 is not found, pill up the collection with local repo
                 // hopefully, this will need to be done ony once
                    foreach (var o in _localContactsRepositoryInMemory.GetAll())
                    {
                        await _repository.CreateAsync(u.usergoogid,o);
                    }
                }
                // not post the incoming obj.
                inObj.usergoogid = u.usergoogid;
                var document = await _repository.CreateAsync(u.usergoogid, inObj);
                return document;
            }
            return null;
        }

        // PUT api/contacts/5
        [HttpPut("{id}")]
        public async Task<Document> Put(string id, [FromBody]Contact inObj)
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

        // DELETE api/contacts/5
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
