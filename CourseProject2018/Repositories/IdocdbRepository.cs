using Microsoft.Azure.Documents;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CourseProject2018.Models;

namespace CourseProject2018.Repositories
{
    public interface IdocdbRepository<T> where T:class
    {
        Task<Document> GetAsync(string userId, string id);
        Task<Document> GetAsync(string id);
        Task<Document> GetFirstDocAsync(string filterString);
        Task<Document> GetFirstDocAsync(string filterString1, string logicOp, string filterString2);
        Task<IEnumerable<T>> GetDocsAsync(string filterString);
        bool IsEmpty(string userId );
        Task<Document> CreateAsync(string userId, T value);
        Task<Document> CreateAsync(T value);
        Task<Document> UpdateAsync(string userId, string id, T value);
        Task<Document> UpdateAsync(string id, T value);
        Task DeleteAsync(string userId, string id);
        Task<IEnumerable<T>> GetItemsAsync<T>(string userId) where T : class;
        void Initialize(string collectionId);
    }
}
