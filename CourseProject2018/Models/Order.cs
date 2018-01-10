using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;
namespace CourseProject2018.Models
{
    public class Order
    {
        [JsonProperty("id")]
        public string id { get; set; }
        public string usergoogid { get; set; }
        [JsonProperty("date")]
        public string date { get; set; }

        [JsonProperty("Items")]
        public List<Item> Items { get; set; }
        public string email { get; set; }
        public string token { get; set; }
        public int amount { get; set; }
    }
}
