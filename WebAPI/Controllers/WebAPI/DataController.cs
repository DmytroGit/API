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
        DataModel model = new DataModel();
        
        //возвращает папки и файлы
        public HttpResponseMessage Get()
        {
            var queryString = this.Request.GetQueryNameValuePairs();
            string id = "";

            //проходимся по коллекции параметров и выбираем нужный - "paramPath"
            foreach (var item in queryString)
                if (item.Key == "paramPath")
                    id = item.Value;

            //пытаемся взять все локальные диски
            try
            {
                //присвоение локальных дисков свойству переменной
                model.locDisc = Directory.GetLogicalDrives();
            }
            catch (Exception)//при неудаче
            {
                model.locDisc = null;
            }
            //пытаемся взять папки в текущей
            try
            {
                //присвоение перечня папок к свойству объекта
                model.folders = Directory.GetDirectories(id);
            }
            catch (Exception)//если не получилось
            {
                model.folders = null;
            }
            //пытаемся взять файлы в текущей папке
            try
            {
                //присвоение перечня файлов к свойству объекта
                model.files = Directory.GetFiles(id);
            }
            catch (Exception)//если не получилось
            {
                model.folders = null;
            }

            //пытаемся взять инфу о файлах во вложенных папках
            try
            {
                int count10 = 0;
                int count1050 = 0;
                int count100 = 0;

                //получем список путей(полных имен) к всем файлов
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
                //так как поля есть тип которые могут быть null то при исключении присваиваем им null
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