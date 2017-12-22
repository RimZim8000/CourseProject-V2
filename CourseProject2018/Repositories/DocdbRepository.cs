using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;

namespace CourseProject2018
{
    public class DocdbRepository<T> : IdocdbRepository<T> where T : class
    {
        public static readonly string DatabaseId = "CosmosDataSocurceForMVP";//courseproject2017-cosmos-datadb
        private string CollectionId;// = "Products";
        private static readonly string AzureEndpoint = "https://courseproject2017-cosmos-datadb.documents.azure.com:443/";
        private static readonly string AzureAuthKey = "";
        private static DocumentClient client;

        public void Initialize(string collectionId)
        {
            CollectionId = collectionId;
            client = new DocumentClient(new Uri(AzureEndpoint), AzureAuthKey);
            CreateDbIfNotExists().Wait();
            CreateCollectionIfNotExists().Wait();
        }

        private async Task CreateCollectionIfNotExists()
        {
            try
            {
                await client.ReadDocumentCollectionAsync(UriFactory.CreateDocumentCollectionUri(DatabaseId, CollectionId));
            }
            catch (DocumentClientException ex)
            {
                if (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    await client.CreateDocumentCollectionAsync(UriFactory.CreateDatabaseUri(DatabaseId),
                        new DocumentCollection { Id = CollectionId });
                    //fill up with some data

                }
                else
                {
                    throw ex;
                }
            }

        }

        private async Task CreateDbIfNotExists()
        {
            try
            {
                await client.ReadDatabaseAsync(UriFactory.CreateDatabaseUri(DatabaseId));
            }
            catch(DocumentClientException ex)
            {
                if(ex.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    await client.CreateDatabaseAsync(new Database { Id = DatabaseId}  );
                }
            }
        }

        public async Task<Document> CreateAsync(T value)
        {
            return await client.CreateDocumentAsync(UriFactory.CreateDocumentCollectionUri(DatabaseId, CollectionId), value);
        }

        public async Task DeleteAsync(string id)
        {
            await client.DeleteDocumentAsync(
                UriFactory.CreateDocumentUri(DatabaseId, CollectionId, id)
                );
        }

        public async Task<T> GetAsync(string id)
        {
            try
            {
                var uri = UriFactory.CreateDocumentUri(DatabaseId, CollectionId, id);
                Document document = await client.ReadDocumentAsync(uri);
                return (T)(dynamic)document;
            }
            catch(DocumentClientException ex)
            {
                throw ex;
            }
        }
        public bool IsEmpty()
        {
            IDocumentQuery<T> query = client.CreateDocumentQuery<T>(
            UriFactory.CreateDocumentCollectionUri(DatabaseId, CollectionId),
            new FeedOptions { MaxItemCount = -1, EnableCrossPartitionQuery = true })
            .AsDocumentQuery();

            if (query.HasMoreResults)
                return false;// it has records, that means it is not empty

            return true;
        }
        public async Task<IEnumerable<T>> GetItemsAsync<T>() where T : class
        {
            IDocumentQuery<T> query = client.CreateDocumentQuery<T>(
            UriFactory.CreateDocumentCollectionUri(DatabaseId, CollectionId),
            new FeedOptions { MaxItemCount = -1, EnableCrossPartitionQuery = true })
            .AsDocumentQuery();

            List<T> results = new List<T>();
            while (query.HasMoreResults)
            {
                results.AddRange(await query.ExecuteNextAsync<T>());
            }

            return results;
        }

        //public async List<T> GetAllAsync()
        //{
        //    try
        //    {
        //        var uri = UriFactory.CreateDocumentUri(DatabaseId, CollectionId, id);
        //        Document document = await client.ReadDocumentCollectionAsync()
        //        return (T)(dynamic)document;
        //    }
        //    catch (DocumentClientException ex)
        //    {
        //        throw ex;
        //    }
        //}
        public async Task<Document> UpdateAsync(string id, T value)
        {
            var uri = UriFactory.CreateDocumentUri(DatabaseId, CollectionId, id);
            Document document = await client.ReplaceDocumentAsync(uri, value);
            return document;
        }
    }
}
