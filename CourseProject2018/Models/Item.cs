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
    public class Item {
        public int Id { get; set; }
        public string title { get; set; }

        public string user { get; set; }
    }
}