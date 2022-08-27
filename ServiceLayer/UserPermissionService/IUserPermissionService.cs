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

        UserPermission GetUserPermission(int id);
        IEnumerable<UserPermission> GetPermissionForUser(User user);
        void InsertUserPermission(UserPermission userPermission);
        void UpdateUserPermission(UserPermission userPermission);
        void DeleteUserPermission(int id);
    }
}
