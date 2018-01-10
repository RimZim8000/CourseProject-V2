using CourseProject2018.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CourseProject2018.Repositories
{
    public interface IContactsRepositoryInMemory
    {
        Contact Get(string id);
        List<Contact> GetAll();
        void Post(Contact c);
        void Put(string id, Contact c);
        void Delete(string id);
    }
    public class ContactsRepositoryInMemory : IContactsRepositoryInMemory
    {
        //private DocumentClient  
        List<Contact> _contacts;

        public ContactsRepositoryInMemory()
        {
            _contacts = new List<Contact>();

            filUpContactRepo();
           
        }

        public void Delete(string id)
        {
            Contact c = _contacts.Find(x => x.id == id);
            if (c != null) _contacts.Remove(c);
        }

        public Contact Get(string id)
        {
            return _contacts.Find(x => x.id == id);
        }

        public List<Contact> GetAll()
        {
            return _contacts;
        }

        public void Post(Contact c)
        {
            _contacts.Add(c);
        }

        public void Put(string id, Contact c)
        {
            Delete(id);
            Post(c);
        }

        private void filUpContactRepo2()
        {
            int start = 123456;
            int count = start + 10;
            for (int i = start; i < count; i++)
            {
                string str = "{\"id\":\"" + i.ToString() + "\",";
                str += "\"first_name\":\"first_name__" + i.ToString() + "__\",";
                str += "\"last_name\":\"last_name__" + i.ToString() + "__\",";
                str += "\"email\":\"dummay_email__" + i.ToString() + "__@dodo.com\",";
                str += "\"subject\":\"subject: Dummy Subject __" + i.ToString() + "__::\",";
                str += "\"description\":\"Dummay description __" + i.ToString() + "__ for this contact\"}";
                // if (i < count - 1) str += ",";
                Contact deserializedContact = Newtonsoft.Json.JsonConvert.DeserializeObject<Contact>(str);
                _contacts.Add(deserializedContact);
            }
        }
        private void filUpContactRepo()
        {
            int start = 123456;
            int count = start + 10;
            Contact c0 = new Contact()
            {
                id = "0",
                usergoogid= "111895598430752668841",
                first_name = "John",
                last_name = "Smith",
                email = "JohnSmith@JohnSmith.us",
                subject = "Hi Library system, Please Read this",
                description = "We would like to send our students to you library. Pl accept them. Thanks - John "
            };
            _contacts.Add(c0);
            Contact c1 = new Contact()
            {
                id = "1",
                usergoogid = "111895598430752668841",
                first_name = "DAFFY",
                last_name = "DUCK",
                email = "DAFFY@DUCK.CA",
                subject = "Hi Bugs, Please Read this",
                description = "We would like to explain something to you... I don't care.  - Daffy the Greatest! "
            };
            _contacts.Add(c1);
            Contact c2 = new Contact()
            {
                id = "2",
                usergoogid = "111895598430752668841",
                first_name = "Happy",
                last_name = "BugsBunny",
                email = "HayyBugsBunny@H_B_B.COM",
                subject = "Hi Dafy, Please Read this",
                description = "You are not behaving. Pl behave. Thanks - Bugs "
            };
            _contacts.Add(c2);
            Contact c3 = new Contact()
            {
                id = "3",
                usergoogid = "111895598430752668841",
                first_name = "Crazy",
                last_name = "Captain",
                email = "Crazy_Captain1@CaptainThatIsCrazy.COM",
                subject = "Hi Boat system, Please rent us a boat",
                description = "We would like to rect a boat. Please rent us a boat. Thanks - Crazy One! "
            };
            _contacts.Add(c3);
            Contact c4 = new Contact()
            {
                id = "4",
                usergoogid = "111895598430752668841",
                first_name = "Went",
                last_name = "Up_The_Hill",
                email = "Went_Up_The_Hill@Up_The_Hill.CA",
                subject = "Hi office, Please provide us with office supply",
                description = "We would like to buy some office supply. Please provide us with office supply.  Thanks - Went "
            };
            _contacts.Add(c4);

            Contact c5 = new Contact()
            {
                id = "5",
                usergoogid = "111895598430752668841",
                first_name = "Jack",
                last_name = "And_Jill",
                email = "JackAndJill@J_AND_J.com",
                subject = "Hi bakery, Please bake a cake for us",
                description = "We would like to buy cakes from you. Please bake some cakes. Thanks - Jack and Jill "
            };
            _contacts.Add(c5);
            Contact c6 = new Contact()
            {
                id = "6",
                usergoogid = "111895598430752668841",
                first_name = "Adam",
                last_name = "Wilson",
                email = "AdamWilson@AdamWilson.us",
                subject = "Hi Adam, When will you return from Europe?",
                description = "We would like to know When will you return from Europe?. Pl reply. Thanks - Adam"
            };
            _contacts.Add(c6);
            Contact c7 = new Contact()
            {
                id = "7",
                usergoogid = "111895598430752668841",
                first_name = "Will",
                last_name = "Maker",
                email = "WillMaker@yahoo.us",
                subject = "Hi Library system, When?",
                description = "When can we bring out students to the library. Pl reply. Thanks - John "
            };
            _contacts.Add(c7);
            Contact c8 = new Contact()
            {
                id = "8",
                usergoogid = "111895598430752668841",
                first_name = "JANE  ",
                last_name = "Smith",
                email = "JANESmith@JohnSmith.us",
                subject = "Hi John, Please bring students to the library",
                description = "We would happy to welcome your students to our library. Pl accept our invitation. Thanks - Jane "
            };
            _contacts.Add(c8);
            Contact c9 = new Contact()
            {
                id = "9",
                usergoogid = "111895598430752668841",
                first_name = "John",
                last_name = "Smith",
                email = "JohnSmith@JohnSmith.us",
                subject = "Hi Library system, THIS IS YOUR SECOND REMINDER",
                description = "THIS IS YOUR SECOND REMINDER. We would like to send our students to you library. Pl accept them. Thanks - John "
            };
            _contacts.Add(c9);


        }

    }
}
