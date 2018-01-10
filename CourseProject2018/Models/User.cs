using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace CourseProject2018.Models
{

    
    public class UserInfo
    {
        
        [JsonProperty("id")]
        public string id { get; set; }
        [JsonProperty("displayname")]
        public string displayname { get; set; }
        [JsonProperty("email")]
        public string email { get; set; }
        [JsonProperty("usergoogid")]
        public string usergoogid { get; set; }
        public int regStatus { get; set; }
        public string phone { get; set; }
        public string cell1 { get; set; }
        public string email2 { get; set; }
        public string address1 { get; set; }
        public string address2 { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string zip { get; set; }
        public string mothersmaidenname { get; set; }
        public string pet { get; set; }
        public string token { get; set; }


    }
}
