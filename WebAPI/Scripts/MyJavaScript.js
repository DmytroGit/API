(function ()
{
    //при загрузке страници делаем запрос на сервер и берем локальные диски AJAX-------------------
    $.ajax({
        url: "/api/data",

        success: function (locDisc)
        {
            var list = $("#locDisc"); // находим элемент на странцие куда внедряем список дисков
            var u = 1;

            for (var i = 0; i < locDisc.length; i++)
            { // locDisc - JSON объект полученый со стороны сервера.
                var name = locDisc[i];
                list.append("<u>" + "Disc" + "</u>");
                //list.append("<a href='api/data/1'>" + name + "</a><br />");
            }
            //$("u").on("click", GetFolderFilesCount);
        }
    });

    // после загрузки документа, находим на страцние кнопку и добавляем метод getName как обработчик на событие click
    $(document).ready(function ()
    {
        $("div").on("click"," > u", function ()
        {
            GetFolderFilesCount($(this).html());
        });
        //$("a").on("click", GetFolderFilesCount);
        //$("a").on("click", GetFolderFilesCount);//если кликнем по ссылке с классом folder
        //$("#button").on("click", GetFolderFilesCount);//если кликнем по кнопке будет вызвана функция
    });

    //берем папки и файла ajax---------------------------------------------------------------
    function GetFolderFilesCount(x)
    {
        alert(x + "!!");
        // uri в формате /api/names/id
        //var link = "/api/data/" + $("#elementId").val();
        var link = "/api/data/" + x;

        $.ajax({
            url: link,
            type: "GET",

            // в случае успешной обработки запроса
            success: function (info)//в info есть разные свойства
            {
                //папки/////////////////////////////////////////////////////////////////////////////////
                if (info.folders != null && info.files != null)
                {
                    var list = $("#folders"); // находим элемент на странцие для отображения папок
                    //list.empty();
                    for (var i = 0; i < info.folders.length; i++)
                    {
                        var name = info.folders[i];
                        //list.append("<li>" + name + "</li>");
                        //list.append("<p>" + name + "</p>");

                        list.append("<u>" + "Folder" + "</u><br />");
                    }

                    //файлы/////////////////////////////////////////////////////////////////////////////////
                    var list = $("#files"); // находим элемент на странцие для отображения файлов
                    //list.empty();
                    for (var i = 0; i < info.files.length; i++)
                    { // names - JSON объект полученый со стороны сервера.
                        var name = info.files[i];

                        list.append("<li>" + name + "</li>");
                    }

                    //таблица/////////////////////////////////////////////////////////////////////////////////
                    var list = $("#table"); // находим элемент на странцие для отображения таблицы
                    list.empty();
                    list.append("<td>" + info.count10 + "</td>");
                    list.append("<td>" + info.count1050 + "</td>");
                    list.append("<td>" + info.count100 + "</td>");
                }
            },












            // в случае ошибки
            error: function (xhr)
            {
                if (xhr.status == "404")
                {
                    alert("Элемен по указанному индексу не найден.");
                    $("#receivedElement").text(xhr.responseText);
                }
                if (xhr.status == "500")
                {
                    alert("Ошибка сервера");
                }
            }
        });
    };
})();
