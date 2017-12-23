using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Documents;
using CourseProject2018.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CourseProject2018.Controllers
{
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private IdocdbRepository<Product> _repository;
        public ProductsController(IdocdbRepository<Product> repository)
        {
            _repository = repository;
            _repository.Initialize("Products");
        }
        // GET: api/products
        [HttpGet]
        public async Task<IEnumerable<Product>> GetProducts()
        {
            IEnumerable<Product> lstProducts = await _repository.GetItemsAsync<Product>();
            return lstProducts;
        }

        // GET api/products/1
        [HttpGet("{id}")]
        public async Task<Product> Get(string id)
        {
            var product = await _repository.GetAsync(id);
            return product;
        }

        //// POST api/values
        //[HttpPost]
        //public async Task<Document> Post()
        //{
        //    var product = new Product
        //    {
        //        Id = "1",
        //        Model = "Surface",
        //        Description = "Surface design studio is good"
        //    };
        //    var document = await _repository.CreateAsync(product);
        //    return document;
        //}
        // POST api/products
        [HttpPost]
        public async Task<Document> Post(Product product)
        {
            //var product = new Product
            //{
            //    Id = "1",
            //    Model = "Surface",
            //    Description = "Surface design studio is good"
            //};
            var document = await _repository.CreateAsync(product);
            return document;
        }

        // PUT api/products/5
        [HttpPut("{id}")]
        public async Task<Document> Put(string id)
        {
            var product = new Product
            {
                Id = id,
                Model = "IPhone",
                Description = "9"
            };
            var document = await _repository.UpdateAsync(id, product);
            return document;
        }

        // DELETE api/products/5
        [HttpDelete("{id}")]
        public async Task Delete(string id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
