using DomainLayer;
using DomainLayer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.UserService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserManagement.Models;

namespace UserManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet(nameof(GetUser))]
        public IActionResult GetUser(int id)
        {
            var result = _userService.GetUser(id);
            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");
        }

        [HttpGet(nameof(GetAllUsers))]
        public IActionResult GetAllUsers()
        {
            var result = _userService.GetAllUsers();
            if (result != null)
                return Ok(result);
            return BadRequest("No records found");
        }

        [HttpGet(nameof(GetAllUsersForPagination))]
        public IActionResult GetAllUsersForPagination(int? page, int pageSize,string searchValue)
        {
            var resultForNumberOfPage = _userService.GetCount();
            var result = _userService.GetAllUsersForPagination(page,pageSize, searchValue);
            var pageResult = new PageResult<User>
            {
                Count = resultForNumberOfPage,
                PageIndex = page ?? 1,
                PageSize = pageSize,
                Items = result
            };
            if (result != null)
                return Ok(pageResult);
            return BadRequest("No records found");
        }

        [HttpPost(nameof(InsertUser))]
        public IActionResult InsertUser(User user)
        {
            _userService.InsertUser(user);
            return Ok("Data added");
        }

        [HttpPut(nameof(UpdateUser))]
        public IActionResult UpdateUser(User user)
        {
            _userService.UpdateUser(user);
            return Ok("Data updated");
        }

        [HttpDelete(nameof(DeleteUser))]
        public IActionResult DeleteUser(int id)
        {
            _userService.DeleteUser(id);
            return Ok("Data deleted");
        }
    }
}
