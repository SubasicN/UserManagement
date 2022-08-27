using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DomainLayer
{
    public class Permission : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string Code { get; set; }
        public string Description { get; set; }
    }
}
