(function ()
{
    // Функция вызывается при загрузке скрипта и делает асинхронный запрос на сервер
    $.ajax({

        url: "/api/data",

        success: function (names)
        {

            var list = $("#names"); // находим элемент на странцие

            for (var i = 0; i < names.length; i++)
            { // names - JSON объект полученый со стороны сервера.
                var name = names[i];
                list.append("<li>" + name + "</li>");
            }
        }
    });

    // после загрузки документа, находим на страцние кнопку и добавляем метод getName как обработчик на событие click
    $(document).ready(function ()
    {
        $("#button").on("click", getName);
    });

    function getName()
    {

        // uri в формате /api/names/5
        var link = "/api/data/" + $("#elementId").val();

        $.ajax({
            url: link,
            type: "GET",

            // в случае успешной обработки запроса
            success: function (data)
            {
                $("#receivedElement").text(data); // вывод результата
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
