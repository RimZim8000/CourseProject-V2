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
                description = "Lucky Ducky - If you buy this ducky, there will be no limit to your luck! It is very similar to the 'Felix Felicis' that Harry drank to get lucky! " +
                        " Yes, if you have this Ducky, you can get your professor to tell you the deepest React programming secretes. I did use it. Shuuuu! Steve doesn't know it!"
                , q = 0, flip = -1
            });
            cs.Add(new Item {
                id = "002", name = "Camera", price = "1.00", picture = "images\\camera.jpg",
                description = "X-Ray Camera - This camera looks an ordinary one." +
                        " But, beware. It can help you see things that your eyes can't see. " +
                        " Shuuuu! I know that Steve has it.  How else will he know where I made mistake in my program?"
                ,q = 0, flip = -1 });


            cs.Add(new Item {
                id = "003", name = "dump-truck", price = "1.00", picture = "images\\dump-truck.jpg",
                description = "Dump Truck that can carry the whole Earth - If you buy this dump-truck, you can carry Earth in this truck!" +
                        " Who says Atlas has monopoly on carrying around the Earth."
                ,
                q = 0, flip = -1 });

            cs.Add(new Item
            {
                id = "004", name= "minion", price= "1.00" , picture= "images\\minion.jpg",
                description = "Shuuuu! Minions are immprtals and this one is as well. You can use it, if you want to go swimming." +
                        " Who knows, when you may need it's help!" 
                ,q= 0, flip= -1 });

            cs.Add(new Item
            {
                id = "005", name= "PinWheel", price= "1.00" , picture= "images\\PinWheel.jpg",
                description = "This pin wheel actually can give you light when the lights go off in heary storms!" +
                    " How do you think I learnt the Deepest React programming secretes. I did use it when the lights went off in the heavy snow." 
                ,q= 0, flip= -1 });

            cs.Add(new Item
            {
                id = "006", name= "Ship", price= "1.00" , picture= "images\\Ship.png",
                description = "Want to go in galaxy far far away? This ship is really the 'millenium falcon', the fastest ship " +
                        " in this side of the world - Own this ship to go where no one has gone before!"
                , q= 0, flip= -1 });

            cs.Add(new Item
            {
                id = "007",
                name = "Baby-Hulk",
                price = "1.00",
                picture = "images\\Baby-Hulk.jpg",
                description = "Do you have trouble getting more candies on Halloween?" +
                    " We all have those issues... until we have this baby-hulk with us on our trick-or-treating ventures. He can help you..."
                ,
                q = 0,
                flip = -1
            });

            cs.Add(new Item
            {
                id = "008",
                name = "teddy-bear",
                price = "1.00",
                picture = "images\\teddy-bear.jpg",
                description = "Need a loving and caring campanion? This Teddy will take care of your these needs " +
                        " This Teddy takes care of all the monsters under your bed! Go for it... buy it and you will see!"
                ,
                q = 0,
                flip = -1
            });


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