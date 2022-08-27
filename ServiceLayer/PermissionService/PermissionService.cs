using DomainLayer;
using RepositoryLayer.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceLayer.PermissionService
{
    public class PermissionService : IPermissionService
    {
        private IRepository<Permission> _repository;

        public PermissionService(IRepository<Permission> repository)
        {
            _repository = repository;
        }
        public void DeletePermission(int id)
        {
            _repository.Remove(id);
            _repository.SaveChanges();
        }

        public IEnumerable<Permission> GetAllPermissions()
        {
            return _repository.GetAll();
        }

        public Permission GetPermission(int id)
        {
            return _repository.Get(id);
        }

        public void InsertPermission(Permission permission)
        {
            _repository.Insert(permission);
        }

        public void UpdatePermission(Permission permission)
        {
            _repository.Update(permission);
        }
    }
}
