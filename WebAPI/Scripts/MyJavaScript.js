(function ()
{
    //при загрузке страници делаем запрос на сервер и берем локальные диски AJAX-------------------
    //alert("function()");
    $.ajax({

        url: "/api/data",

        success: function (data)
        {
            //alert("/api/data?paramPath=D:/1");

            //локальные диски//////////////////////////////////////////////////////////////////////////
            if (data != null && data.locDisc != null)
            {
                //alert("data != null && data.locDisc != null");
                var list = $("#locDisc"); // находим элемент на странцие куда внедряем список дисков
                list.empty();

                for (var i = 0; i < data.locDisc.length; i++)
                { // locDisc - JSON объект полученый со стороны сервера.
                    var name = data.locDisc[i];
                    list.append("<text>Диск: </text><a href='api/data?paramPath=" + name + "'>" + name + "</a><br />");
                }
            }
            //файлы///////////////////////////////////////////////////////////////////////////
            if (data != null && data.files != null)
            {
                //alert("data != null && data.files != null");

                var list = $("#files"); // находим элемент на странцие куда внедряем список дисков
                list.empty();


                for (var i = 0; i < data.files.length; i++)
                { // locDisc - JSON объект полученый со стороны сервера.
                    var name = data.files[i];
                    list.append("<text>Файл: </text><text>" + name + "</text><br />");
                }
            }
            ///папки//////////////////////////////////////////////////////////////////////////////
            if (data != null && data.folders != null)
            {
                //alert("data != null && data.folders != null");

                var list = $("#folders"); // находим элемент на странцие куда внедряем список дисков
                list.empty();

                for (var i = 0; i < data.folders.length; i++)
                { // locDisc - JSON объект полученый со стороны сервера.
                    var name = data.folders[i];
                    list.append("<text>Папка: </text><a href='api/data?paramPath=" + name + "'>" + name + "</a><br />");
                }
            }
            //таблица с количеством и размером файлов///////////////////////////////////////////////
            if (data != null)
            {
                var list = $("#table"); // находим элемент на странцие для отображения папок
                list.empty();

                list.append("<td>" + data.count10 + "</td>");
                list.append("<td>" + data.count1050 + "</td>");
                list.append("<td>" + data.count100 + "</td>");
            }
            //текущий каталог/////////////////////////////////////////////////////////////////////////
            if (data != null)
            {
                var list = $("#currentPaht"); // находим элемент на странцие для отображения папок
                list.empty();

                list.append(data.currentPath);
            }
            //каталог на шаг вверх/////////////////////////////////////////////////////////////////////////
            if (data != null && data.parentFolder != null)
            {
                var list = $("#backStep"); // находим элемент на странцие для отображения папок
                list.empty();

                list.append("<a href='api/data?paramPath=" + data.parentFolder + "'>" + data.parentFolder + "</a>");
            }

        }
    });


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // после загрузки документа, находим на страцние кнопку и добавляем метод getName как обработчик на событие click
    $(document).ready(function ()
    {
        $("div").on("click"," > a", function ()
        {
            GetFolderFilesCount($(this).html());
        });
    });

    /////берем папки и файла ajax---------------------------------------------------------------
    function GetFolderFilesCount(data)///($(this).html())
    {
        //alert("GetFolderFilesCount()" + data);

        $.ajax({
            url: "/api/data?paramPath=" +data,

            success: function (data)
            {
                if (data != null && data.locDisc != null)
                {

                    //alert("data != null && data.locDisc != null");
                    var list = $("#locDisc"); // находим элемент на странцие куда внедряем список дисков
                    list.empty();

                    for (var i = 0; i < data.locDisc.length; i++)
                    { // locDisc - JSON объект полученый со стороны сервера.
                        var name = data.locDisc[i];
                        list.append("<text>Диск: </text><a href='api/data?paramPath=" + name + "'>" + name + "</a><br />");
                    }
                }
                if (data != null && data.files != null)
                {
                    //alert("data != null && data.files != null");

                    var list = $("#files"); // находим элемент на странцие куда внедряем список дисков
                    list.empty();
                    for (var i = 0; i < data.files.length; i++)
                    { // locDisc - JSON объект полученый со стороны сервера.
                        var name = data.files[i];
                        list.append("<text>Файл: </text><text>" + name + "</text><br />");
                    }
                }
                if (data != null && data.folders != null)
                {
                    //alert("data != null && data.folders != null");

                    var list = $("#folders"); // находим элемент на странцие куда внедряем список дисков
                    list.empty();
                    for (var i = 0; i < data.folders.length; i++)
                    { // locDisc - JSON объект полученый со стороны сервера.
                        var name = data.folders[i];
                        list.append("<text>Папка: </text><a href='api/data?paramPath=" + name + "'>" + name + "</a><br />");
                    }
                }
                if (data != null)
                {
                    var list = $("#table"); // находим элемент на странцие для отображения папок
                    list.empty();

                    list.append("<td>" + data.count10 + "</td>");
                    list.append("<td>" + data.count1050 + "</td>");
                    list.append("<td>" + data.count100 + "</td>");
                }
                if (data != null)
                {
                    var list = $("#currentPaht"); // находим элемент на странцие для отображения папок
                    list.empty();

                    list.append(data.currentPath);
                }
                //каталог на шаг вверх/////////////////////////////////////////////////////////////////////////
                if (data != null && data.parentFolder != null)
                {
                    var list = $("#backStep"); // находим элемент на странцие для отображения папок
                    list.empty();

                    list.append("<a href='api/data?paramPath=" + data.parentFolder + "'>" + data.parentFolder + "</a>");
                }
            }
        });
    }
})();








///---------------------ДАЛЕЕ ТОЛЬКО КОММЕНТЫ    их не нужно читать-------------------------------------------------------------------

    //    alert(x + "!!22222222222222222222");
    //    // uri в формате /api/names/id
    //    //var link = "/api/data/" + $("#elementId").val();
    //    //var link = "/api/data/" + "213123";
    //    $.ajax({
    //        //url: link,
    //       // type: "GET",
    //        // в случае успешной обработки запроса
    //        //success: function (info)//в info есть разные свойства
    //        //{
    //        //    //папки/////////////////////////////////////////////////////////////////////////////////
    //        //    //if (info.folders != null && info.files != null)
    //        //    //{
    //        //    //    var list = $("#folders"); // находим элемент на странцие для отображения папок
    //        //    //    //list.empty();
    //        //    //    for (var i = 0; i < info.folders.length; i++)
    //        //    //    {
    //        //    //        var name = info.folders[i];
    //        //    //        //list.append("<li>" + name + "</li>");
    //        //    //        //list.append("<p>" + name + "</p>");
    //        //    //        list.append("<u>" + "Folder" + "</u><br />");
    //        //    //    }
    //        //    //    //файлы/////////////////////////////////////////////////////////////////////////////////
    //        //    //    var list = $("#files"); // находим элемент на странцие для отображения файлов
    //        //    //    //list.empty();
    //        //    //    for (var i = 0; i < info.files.length; i++)
    //        //    //    { // names - JSON объект полученый со стороны сервера.
    //        //    //        var name = info.files[i];
    //        //    //        list.append("<li>" + name + "</li>");
    //        //    //    }
    //        //    //    //таблица/////////////////////////////////////////////////////////////////////////////////
    //        //    //    var list = $("#table"); // находим элемент на странцие для отображения таблицы
    //        //    //    list.empty();
    //        //    //    list.append("<td>" + info.count10 + "</td>");
    //        //    //    list.append("<td>" + info.count1050 + "</td>");
    //        //    //    list.append("<td>" + info.count100 + "</td>");
    //        //    //}
    //        //}
    //        //,
    //        // в случае ошибки
    //        //error: function (xhr)
    //        //{
    //        //    if (xhr.status == "404")
    //        //    {
    //        //        alert("Элемен по указанному индексу не найден.");
    //        //        $("#receivedElement").text(xhr.responseText);
    //        //    }
    //        //    if (xhr.status == "500")
    //        //    {
    //        //        alert("Ошибка сервера");
    //        //    }
    //        //}
    //    });
    //    };
    //////////////////////////////////////////////////////////////
    //})();
