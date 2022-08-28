using DomainLayer;
using DomainLayer.Models;
using RepositoryLayer.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceLayer.UserPermissionService
{
    public class UserPermissionService : IUserPermissionService
    {
        private UserPremissionRepository _repository;

        public UserPermissionService(UserPremissionRepository repository)
        {
            _repository = repository;
        }

        public void DeleteUserPermission(int id)
        {
            _repository.Remove(id);
            _repository.SaveChanges();
        }

        public IEnumerable<UserPermission> GetAllUsersPermission()
        {
            return _repository.GetAll();
        }

        public IEnumerable<UserPermission> GetAllUsersPermissionForPagination(int? page, int pageSize)
        {
            return _repository.GetAllForPagination(page, pageSize);
        }

        public int GetCount()
        {
            return _repository.GetCount();
        }

        public IEnumerable<UserPermission> GetPermissionForUser(int userId)
        {
            return _repository.GetPermissionForUser(userId);
        }

        public UserPermission GetUserPermission(int id)
        {
            return _repository.Get(id);
        }

        public void InsertUserPermission(UserPermission userPermission)
        {
            _repository.Insert(userPermission);
        }

        public void UpdateUserPermission(UserPermission userPermission)
        {
            _repository.Update(userPermission);
        }
    }
}
