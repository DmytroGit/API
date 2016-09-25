using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TestAngularJSWebAPI.Controllers
{
    public class HomeController : Controller
    {
        //метод поиска всего нужного папки/ файлы / количество/ размер
        public ActionResult Index()
        {
            try
            {
                //загруска лок дисков
                ViewBag.Disc = Directory.GetLogicalDrives();

                if (Request.QueryString["message"] != null)
                {
                    //берем путь к папке
                    var path = Request.QueryString["message"];

                    //перечень папок в папке
                    ViewBag.Folders = Directory.GetDirectories(path);

                    //перечень файлов в папке
                    ViewBag.Files = Directory.GetFiles(path);

                    //пробуем подсчитать количество файлов / размер
                    try
                    {
                        //получем список путей к всем файлов
                        var mapRout = Directory.GetFiles(path, ".", SearchOption.AllDirectories);

                        //переменные для кол-ва файлов по определенным размерам
                        int count10 = 0;
                        int count1050 = 0;
                        int count100 = 0;

                        FileInfo fileInfo;

                        //в цикле стучимся к каждому файлу и взвешиваем его с учетом <10 / >=10 и <=50 / >100
                        for (int i = 0; i < mapRout.Length; i++)
                        {
                            fileInfo = new FileInfo(mapRout[i]);

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

                        ViewBag.CountFiles10 = count10;//кол-во до 10 мегабайт
                        ViewBag.CountFiles1050 = count1050;//кол-во 10-50 мегабайт
                        ViewBag.CountFiles50 = count100;//кол-во от 100 мегабайт
                        ViewBag.CountFilesAll = mapRout.Length;//кол-во всех
                    }
                    catch (Exception)
                    {
                        ViewBag.CountFiles10 = "Не удалось подсчитать";
                        ViewBag.CountFiles1050 = "Не удалось подсчитать";
                        ViewBag.CountFiles50 = "Не удалось подсчитать";
                        ViewBag.CountFilesAll = "Не удалось подсчитать";

                        ViewBag.Message = "Не удалось подсчитать некоторое количество файлов, фозможно доступ к ним данным образом запрещен. Но Вы можете продожать работу.";
                    }
                }

                return View();
            }
            catch (Exception exp)
            {
                ViewBag.error = exp;
                return View("Error");
            }
        }
    }
}