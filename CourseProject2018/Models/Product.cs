using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CourseProject2018.Models
{
    public class Product
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("model")]
        public string Model { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }
    }
}
