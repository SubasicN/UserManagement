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

        [HttpGet(nameof(GetAllUsersPermissionForPagination))]
        public IActionResult GetAllUsersPermissionForPagination(int? page, int pageSize)
        {
            var resultForNumberOfPage = _userPermissionService.GetCount();
            var result = _userPermissionService.GetAllUsersPermissionForPagination(page, pageSize);
            var pageResult = new PageResult<UserPermission>
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

        [HttpGet(nameof(GetPermissionForUser))]
        public IActionResult GetPermissionForUser(int userId)
        {
            var result = _userPermissionService.GetPermissionForUser(userId);
            if (result != null)
                return Ok(result);
            return BadRequest("No records found");
        }

        [HttpGet(nameof(GetPermissionForUserWithPagination))]
        public IActionResult GetPermissionForUserWithPagination(int userId,int? page, int pageSize)
        {
            var resultForNumberOfPage = _userPermissionService.GetPermissionForUser(userId).Count();
            var result = _userPermissionService.GetPermissionForUserWithPagination(userId,page, pageSize);
            var pageResult = new PageResult<UserPermission>
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
