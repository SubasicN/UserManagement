using DomainLayer;
using DomainLayer.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceLayer.UserPermissionService
{
    public interface IUserPermissionService
    {
        IEnumerable<UserPermission> GetAllUsersPermission();
        IEnumerable<UserPermission> GetAllUsersPermissionForPagination(int? page, int pageSize, string searchValue);
        UserPermission GetUserPermission(int id);
        IEnumerable<UserPermission> GetPermissionForUser(int userId);
        IEnumerable<UserPermission> GetPermissionForUserWithPagination(int userId,int? page, int pageSize, string searchValue);
        void InsertUserPermission(UserPermission userPermission);
        void UpdateUserPermission(UserPermission userPermission);
        void DeleteUserPermission(int id);
        int GetCount();
    }
}
