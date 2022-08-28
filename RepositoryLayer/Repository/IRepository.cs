using DomainLayer;
using System;
using System.Collections.Generic;
using System.Text;

namespace RepositoryLayer.Repository
{
    public interface IRepository<T> where T : BaseEntity
    {
        IEnumerable<T> GetAll();
        IEnumerable<T> GetAllForPagination(int? page, int pageSize, string searchValue);
        T Get(int id);
        void Insert(T entity);
        void Update(T entity);
        void Delete(int id);
        void Remove(int id);
        void SaveChanges();
        int GetCount();
    }
}
