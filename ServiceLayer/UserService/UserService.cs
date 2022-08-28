using DomainLayer;
using RepositoryLayer.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceLayer.UserService
{
    public class UserService : IUserService
    {
        private IRepository<User> _repository;

        public UserService(IRepository<User> repository)
        {
            _repository = repository;
        }

        public void DeleteUser(int id)
        {
            _repository.Remove(id);
            _repository.SaveChanges();
        }

        public IEnumerable<User> GetAllUsers()
        {
            return _repository.GetAll();
        }

        public IEnumerable<User> GetAllUsersForPagination(int? page, int pageSize)
        {
            return _repository.GetAllForPagination(page, pageSize);
        }

        public int GetCount()
        {
            return _repository.GetCount();
        }

        public User GetUser(int id)
        {
            return _repository.Get(id);
        }

        public void InsertUser(User user)
        {
            _repository.Insert(user);
        }

        public void UpdateUser(User user)
        {
            _repository.Update(user);
        }
    }
}
