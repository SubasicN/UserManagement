using DomainLayer;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceLayer.UserService
{
    public interface IUserService
    {
        IEnumerable<User> GetAllUsers();

        User GetUser(int id);
        void InsertUser(User user);
        void UpdateUser(User user);
        void DeleteUser(int id);
    }
}
