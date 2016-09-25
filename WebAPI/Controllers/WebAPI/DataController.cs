using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace WebAPI.Controllers.WebAPI
{
    public class DataController : ApiController
    {
        //возвращает все локальные диски
        // GET api/name
        public IEnumerable<string> Get()
        {
            //загруска лок дисков
            return Directory.GetLogicalDrives();
        }
        

        //возвращает папки и файлы
        public HttpResponseMessage Get(int id)
        {
            //загруска лок дисков
            var localDisc = Directory.GetLogicalDrives();

            if (id < localDisc.Length)
            {
                return Request.CreateResponse(HttpStatusCode.OK, localDisc[id]);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, "Item not found"); //Status code 404
            }
        }
    }
}