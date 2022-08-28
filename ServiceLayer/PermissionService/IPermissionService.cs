using DomainLayer;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceLayer.PermissionService
{
    public interface IPermissionService
    {
        IEnumerable<Permission> GetAllPermissions();
        IEnumerable<Permission> GetAllPermissionsForPagination(int? page, int pageSize,string searchValue);
        int GetCount();
        Permission GetPermission(int id);
        void InsertPermission(Permission permission);
        void UpdatePermission(Permission permission);
        void DeletePermission(int id);
    }
}
