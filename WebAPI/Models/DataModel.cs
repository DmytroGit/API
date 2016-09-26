using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class DataModel
    {
        public string[] locDisc { get; set; }
        public string[] folders { get; set; }
        public string[] files { get; set; }
        public int? count10 { get; set; }
        public int? count1050 { get; set; } 
        public int? count100 { get; set; }
    }
}