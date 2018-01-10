using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using CourseProject2018.Models;

namespace CourseProject2018.Repositories
{
    public class Items 
    {
        public List<Item> cs;
        public Items()
        {
            cs = new List<Item>();

            cs.Add(new Item {
                id = "001", name = "Ducky", price = "1.00", picture = "images\\ducky.jpg",
                description = "Bath Ducky - If you buy this ducky, there will be no limit to your luck! It is very similar to the 'Felix Felicis' that Harry drank to get lucky! " +
                 "Yes, if you have this Ducky, you can get your professor to tell you the deepest React programming secretes. I did use it. Shuuuu! Steve doesn't know it!",
                q = 0, flip = -1
            });
            cs.Add(new Item {
                id = "002", name = "Camera", price = "1.00", picture = "images\\camera.jpg", description = "Camera",
                q = 0, flip = -1 });


            cs.Add(new Item {
                id = "003", name = "dump-truck", price = "1.00", picture = "images\\dump-truck.jpg", description = "dump-truck",
                q = 0, flip = -1 });

            cs.Add(new Item
            {
                id = "004", name= "minion", price= "1.00" , picture= "images\\minion.jpg", description= "minion", 
                q= 0, flip= -1 });

            cs.Add(new Item
            {
                id = "005", name= "PinWheel", price= "1.00" , picture= "images\\PinWheel.jpg", description= "PinWheel", 
                q= 0, flip= -1 });

            cs.Add(new Item
            {
                id = "006", name= "Ship", price= "1.00" , picture= "images\\Ship.png", description= "Ship", 
                q= 0, flip= -1 });

        }
        public List<Item>  getAll()
        {
            return cs;
        }
        public Item Get(string id)
        {
            return cs.Where(x => (string.Compare(id, x.id, true) == 0)).FirstOrDefault();
        }

        public IEnumerable<Item> GetNonZeroQuantity()
        {
            return cs.Where(x => (x.q > 0));
        }
    }
}