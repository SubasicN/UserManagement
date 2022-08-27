using DomainLayer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RepositoryLayer.Repository;
using ServiceLayer.PermissionService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionController : ControllerBase
    {
        private readonly IPermissionService _permissionService;

        public PermissionController(IPermissionService permissionService)
        {
            _permissionService = permissionService;
        }

        [HttpGet(nameof(GetPermission))]
        public IActionResult GetPermission(int id)
        {
            var result = _permissionService.GetPermission(id);
            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");
        }

        [HttpGet(nameof(GetAllPermissions))]
        public IActionResult GetAllPermissions()
        {
            var result = _permissionService.GetAllPermissions();
            if (result != null)
                return Ok(result);
            return BadRequest("No records found");
        }

        [HttpPost(nameof(InsertPermission))]
        public IActionResult InsertPermission(Permission permission) 
        {
            _permissionService.InsertPermission(permission);
            return Ok("Data added");
        }

        [HttpPut(nameof(UpdatePermission))]
        public IActionResult UpdatePermission(Permission permission)
        {
            _permissionService.UpdatePermission(permission);
            return Ok("Data updated");
        }

        [HttpDelete(nameof(DeletePermission))]
        public IActionResult DeletePermission(int id)
        {
            _permissionService.DeletePermission(id);
            return Ok("Data deleted");
        }

    }
}
