using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace CourseProject2018.Models
{
    public class User
    {
        [JsonProperty("id")]
        public string id { get; set; }
        [JsonProperty("displayname")]
        public string displayname { get; set; }
        [JsonProperty("email")]
        public string email { get; set; }
        [JsonProperty("usergoogleid")]
        public string usergoogleid { get; set; }
    }
}
