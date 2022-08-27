using DomainLayer;
using DomainLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RepositoryLayer.Repository
{
    public class UserPremissionRepository : IRepository<UserPermission>
    {
        private readonly ApplicationDbContext _context;

        public UserPremissionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Delete(int id)
        {
            UserPermission entity = Get(id);
            _context.Remove(entity);
            _context.SaveChanges();
        }

        public IEnumerable<UserPermission> GetPermissionForUser(int userId)
        {
            return _context.UserPermission.Include(m=> m.user)
                                          .Include(m => m.permission)
                                          .Where(m => m.user.Id == userId).AsEnumerable();
        }

        public UserPermission Get(int id)
        {
            return _context.UserPermission.Include(m => m.user)
                                          .Include(m => m.permission)
                                          .SingleOrDefault(m => m.Id == id);
        }

        public IEnumerable<UserPermission> GetAll()
        {
            return _context.UserPermission.Include(m => m.user)
                                          .Include(m => m.permission).AsEnumerable();
        }

        public void Insert(UserPermission entity)
        {
            if (entity == null)
                throw new ArgumentNullException("entity");
            _context.Permissions.Attach(entity.permission);
            _context.Users.Attach(entity.user);
            _context.UserPermission.Add(entity);
            _context.SaveChanges();
        }

        public void Remove(int id)
        {
            UserPermission entity = Get(id);
            _context.UserPermission.Remove(entity);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public void Update(UserPermission entity)
        {
            if (entity == null)
                throw new ArgumentNullException("entity");

            _context.UserPermission.Update(entity);
            _context.SaveChanges();
        }
    }
}
