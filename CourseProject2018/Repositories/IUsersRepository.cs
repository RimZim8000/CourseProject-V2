using CourseProject2018.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CourseProject2018.Repositories
{

    public interface IUserInfosRepositoryInMemory
    {
        UserInfo Get(string id);
        List<UserInfo> GetAll();
        void Post(UserInfo u);
        void Put(string id, UserInfo u);
        void Delete(string id);
    }

    public class UserInfosRepositoryInMemory : IUserInfosRepositoryInMemory
    {
        List<UserInfo> _UserInfos;
        public UserInfosRepositoryInMemory()
        {
            _UserInfos = new List<UserInfo>
            {
                new UserInfo(){id="1", displayname="DUMMY NAME1", email="dummy1@gmail.com", usergoogid="dummy1-UserInfo-googleid" },
                new UserInfo(){id="2", displayname="Dummy Name2", email="dummy2@yahoo.com", usergoogid="dummy2-UserInfo-yahooid" }
            };
        }

        public void Delete(string id)
        {
            UserInfo uFound = null;
            foreach (UserInfo u in _UserInfos)
            {
                if (u.id == id) { uFound = u; break; }
            }
            if (uFound != null) _UserInfos.Remove(uFound);
        }

        public UserInfo Get(string id)
        {
            foreach(UserInfo u in _UserInfos)
            {
                if (u.id == id) return u;
            }
            return new UserInfo() { };
        }

        public List<UserInfo> GetAll()
        {
            return _UserInfos;
        }

        public void Post(UserInfo u)
        {
            _UserInfos.Add(u);
        }

        public void Put(string id, UserInfo u)
        {
            Delete(id);
            Post(u);
        }
    }
}
