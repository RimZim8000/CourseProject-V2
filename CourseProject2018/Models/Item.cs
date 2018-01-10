using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
namespace CourseProject2018.Models
{
    public class Item
    {
        public string id { get; set; }
        public string name { get; set; }
        public string price { get; set; }
        public string picture { get; set; }
        public string description { get; set; }
        public int q { get; set; }
        public int flip { get; set; }

    }
}