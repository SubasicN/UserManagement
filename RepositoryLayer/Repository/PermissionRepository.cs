using DomainLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RepositoryLayer.Repository
{
    public class PermissionRepository : IRepository<Permission>
    {
        private readonly ApplicationDbContext _context;

        public PermissionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Delete(int id)
        {
            Permission entity = Get(id);
            _context.Remove(id);
            _context.SaveChanges();
        }

        public Permission Get(int id)
        {
            return _context.Permissions.SingleOrDefault(m => m.Id == id);
        }

        public IEnumerable<Permission> GetAll()
        {
            return _context.Permissions.AsEnumerable();
        }

        public IEnumerable<Permission> GetAllForPagination(int? page, int pageSize,string searchValue)
        {
            return _context.Permissions.Where(m => m.Id.ToString().Contains(searchValue) || m.Code.Contains(searchValue) || m.Description.Contains(searchValue) || searchValue == null)
                                        .OrderBy(m => m.Id)
                                       .Skip((page - 1 ?? 0) * pageSize)
                                       .Take(pageSize)
                                       .AsEnumerable();
        }

        public int GetCount()
        {
            return _context.Permissions.Count();
        }

        public void Insert(Permission entity)
        {
            if (entity == null)
                throw new ArgumentNullException("entity");
            _context.Permissions.Add(entity);
            _context.SaveChanges();
        }

        public void Remove(int id)
        {
            Permission entity = Get(id);
            _context.Permissions.Remove(entity);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public void Update(Permission entity)
        {
            if (entity == null)
                throw new ArgumentNullException("entity");

            _context.Permissions.Update(entity);
            _context.SaveChanges();
        }
    }
}
