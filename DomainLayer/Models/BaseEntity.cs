﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DomainLayer
{
    public class BaseEntity
    {

        [Required]
        public int Id { get; set; }
    }
}
