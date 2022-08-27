using DomainLayer;
using DomainLayer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.UserPermissionService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserPermissionController : ControllerBase
    {
        private readonly IUserPermissionService _userPermissionService;

        public UserPermissionController(IUserPermissionService userPermissionService)
        {
            _userPermissionService = userPermissionService;
        }

        [HttpGet(nameof(GetUserPermission))]
        public IActionResult GetUserPermission(int id)
        {
            var result = _userPermissionService.GetUserPermission(id);
            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");
        }

        [HttpGet(nameof(GetAllUsersPermission))]
        public IActionResult GetAllUsersPermission()
        {
            var result = _userPermissionService.GetAllUsersPermission();
            if (result != null)
                return Ok(result);
            return BadRequest("No records found");
        }

        [HttpGet(nameof(GetPermissionForUser))]
        public IActionResult GetPermissionForUser(User user)
        {
            var result = _userPermissionService.GetPermissionForUser(user);
            if (result != null)
                return Ok(result);
            return BadRequest("No records found");
        }

        [HttpPost(nameof(InsertUserPermission))]
        public IActionResult InsertUserPermission(UserPermission userPermission)
        {
            _userPermissionService.InsertUserPermission(userPermission);
            return Ok("Data added");
        }

        [HttpPut(nameof(UpdateUserPermission))]
        public IActionResult UpdateUserPermission(UserPermission userPermission)
        {
            _userPermissionService.UpdateUserPermission(userPermission);
            return Ok("Data updated");
        }

        [HttpDelete(nameof(DeleteUserPermission))]
        public IActionResult DeleteUserPermission(int id)
        {
            _userPermissionService.DeleteUserPermission(id);
            return Ok("Data deleted");
        }
    }
}
