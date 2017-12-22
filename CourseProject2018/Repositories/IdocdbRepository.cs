using Microsoft.Azure.Documents;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CourseProject2018
{
    public interface IdocdbRepository<T> where T:class
    {
        Task<T> GetAsync(string id);
        bool IsEmpty();
        Task<Document> CreateAsync(T value);
        Task<Document> UpdateAsync(string id, T value);
        Task DeleteAsync(string id);
        Task<IEnumerable<T>> GetItemsAsync<T>() where T : class;
        void Initialize(string collectionId);

    }
}
