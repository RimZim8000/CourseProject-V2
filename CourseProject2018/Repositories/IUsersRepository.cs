using CourseProject2018.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CourseProject2018.Repositories
{
    public interface IUsersRepositoryInMemory
    {
        User Get(string id);
        List<User> GetAll();
        void Post(User u);
        void Put(string id, User u);
        void Delete(string id);
    }

    public class UsersRepositoryInMemory : IUsersRepositoryInMemory
    {
        List<User> _users;
        public UsersRepositoryInMemory()
        {
            _users = new List<User>
            {
                new User(){id="1", displayname="DUMMY NAME1", email="dummy1@gmail.com", usergoogleid="dummy1-user-googleid" },
                new User(){id="2", displayname="Dummy Name2", email="dummy2@yahoo.com", usergoogleid="dummy2-user-yahooid" }
            };
        }

        public void Delete(string id)
        {
            User uFound = null;
            foreach (User u in _users)
            {
                if (u.id == id) { uFound = u; break; }
            }
            if (uFound != null) _users.Remove(uFound);
        }

        public User Get(string id)
        {
            foreach(User u in _users)
            {
                if (u.id == id) return u;
            }
            return new User() { };
        }

        public List<User> GetAll()
        {
            return _users;
        }

        public void Post(User u)
        {
            _users.Add(u);
        }

        public void Put(string id, User u)
        {
            Delete(id);
            Post(u);
        }
    }
}
