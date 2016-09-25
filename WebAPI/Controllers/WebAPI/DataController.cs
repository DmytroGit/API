using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebAPI.Controllers.WebAPI
{
    public class DataController : ApiController
    {
        //запрос api/Data           //json / xml
        public DateTime Get()
        {
            return DateTime.Now;
        }
    }
}
/* // GET: api/Default
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Default/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Default
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Default/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Default/5
        public void Delete(int id)
        {
        }
*/