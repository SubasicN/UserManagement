using DomainLayer;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceLayer.UserService
{
    public interface IUserService
    {
        IEnumerable<User> GetAllUsers();
        IEnumerable<User> GetAllUsersForPagination(int? page, int pageSize);
        int GetCount();
        User GetUser(int id);
        void InsertUser(User user);
        void UpdateUser(User user);
        void DeleteUser(int id);
    }
}
