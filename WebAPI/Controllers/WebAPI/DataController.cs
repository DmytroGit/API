using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebAPI.Models;

namespace WebAPI.Controllers.WebAPI
{
    public class DataController : ApiController
    {
        //возвращает все локальные диски
        // GET api/name
        public IEnumerable<string> Get()
        {
            //тест QueryString
            var queryString = this.Request.GetQueryNameValuePairs();
            
            //загруска лок дисков
            return Directory.GetLogicalDrives();
        }

        //возвращает папки и файлы
        public HttpResponseMessage Get(string id/*путь к папке*/)
        {
            var queryString = this.Request.GetQueryNameValuePairs();

            TestModel model = new TestModel();

            id = @"D:/Новая папка";

            //пытаемся взять папки в текущей
            try
            {
                //перечень папок в папке
                var folders = Directory.GetDirectories(id);

                //присвоение перечня папок к свойству объекта
                model.folders = folders;
            }
            catch (Exception)//если не получилось
            {
                model.folders = null;
            }
            //пытаемся взять файлы в текущей папке
            try
            {
                //перечень файлов в папке
                var files = Directory.GetFiles(id);

                //присвоение перечня папок к свойству объекта
                model.files = files;
            }
            catch (Exception)//если не получилось
            {
                //присвоение перечня папок к свойству объекта
                model.folders = null;
            }

            //пытаемся взять инфу о файлах во вложенных папках
            try
            {
                int count10 = 0;
                int count1050 = 0;
                int count100 = 0;

                //получем список путей к всем файлов
                var mapRout = Directory.GetFiles(id, ".", SearchOption.AllDirectories);

                //в цикле стучимся к каждому файлу и взвешиваем его с учетом <10  >=10&&<=50  >100
                for (int i = 0; i < mapRout.Length; i++)
                {
                    FileInfo fileInfo = new FileInfo(mapRout[i]);

                    //1 мегабайт == 1048576 байт (fileInfo.Length вернет в байтах)
                    if (fileInfo.Length <= 1048576)
                    {
                        count10++;
                    }
                    if (fileInfo.Length > 1048576 && fileInfo.Length <= 52428800)
                    {
                        count1050++;
                    }
                    if (fileInfo.Length >= 104857600)
                    {
                        count100++;
                    }
                }

                model.count10 = count10;
                model.count1050 = count1050;
                model.count100 = count100;
            }
            catch (Exception)
            {
                model.count10 = null;
                model.count1050 = null;
                model.count100 = null;
            }
            if (model != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, model);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, "Item not found"); //status code 404
            }
        }//public HttpResponseMessage Get(string id/*путь к папке*/)
    }
}