using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DomainLayer.Models
{
    public class UserPermission : BaseEntity
    {
        [Required]
        public User user { get; set; }

        [Required]
        public Permission permission { get; set; }
    }
}
