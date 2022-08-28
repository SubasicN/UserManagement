using DomainLayer;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RepositoryLayer.Repository
{
    public class UserRepository : IRepository<User>
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Delete(int id)
        {
            User entity = Get(id);
            _context.Remove(entity);
            _context.SaveChanges();
        }

        public User Get(int id)
        {
            return _context.Users.SingleOrDefault(m => m.Id == id);
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users.AsEnumerable();
        }

        public IEnumerable<User> GetAllForPagination(int? page, int pageSize)
        {
            return _context.Users.OrderBy(m => m.Id)
                                 .Skip((page - 1 ?? 0) * pageSize)
                                 .Take(pageSize)
                                 .AsEnumerable();
        }

        public void Insert(User entity)
        {
            if (entity == null)
                throw new ArgumentNullException("entity");
            _context.Users.Add(entity);
            _context.SaveChanges();
        }

        public void Remove(int id)
        {
             User entity = Get(id);
            _context.Users.Remove(entity);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public void Update(User entity)
        {
            if (entity == null)
                throw new ArgumentNullException("entity");

            _context.Users.Update(entity);
            _context.SaveChanges();
        }
        public int GetCount()
        {
            return _context.Users.Count();
        }
    }
}
