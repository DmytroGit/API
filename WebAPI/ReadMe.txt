﻿Комментарии к проекту.

1 Принцип передачи данных от сервера к клиенту:
	- в конкретно данном примере клиент всегда будет обращаться к методу 
	  (public HttpResponseMessage Get()) в контроллере (DataController.cs)

	- для передачи сложных данных был создан класс (DataModel.cs) с полями
	  которые будут в себе хранить:
							* перечень папок (массив имен папок);
							* перечень файлов (массив именен файлов);
							* количество файлов с размером <= 10 MB (свойство int);
							* количество файлов с размером >10 MB && <=50 (свойство int);
							* количество файлов с размером >= 100 MB (свойство int);
							* текущий каталог;
							* родительский каталог;

	- целочисленные поля в классе (DataModel.cs) были обозначены (?) чтобы они могли имеь значение (null),
	  это было сделано для того чтобы при неудачном подсчете файлов пользователь приходило
	  не какое нибудь целочисленное значение к примеру (0), а null. Тоесть если придет null,
	  то пользователь сразу поймет что на сервере произошло исключение, а в случае если произойдет исключение
	  и придет (0) то пользователь будет думать что файлов именно (0), а про исключение не будет догадываться.
	  Вот для этого и было сделана приставка (?) к (int).

	- при подсчетах были использованы try{}catch(){}.

	- в отдельный блок try{}catch(){} взято вычисление родительского каталога;
	- в отдельный блок try{}catch(){} взято вычисление перечня папок;
    - в отдельный блок try{}catch(){} взято вычисление перечня файлов;
	- в отдельный блок try{}catch(){} взято вычисление количества / размера файлов;

	Так много try{}catch(){} для того чтобы если гдето возникает исключение, то 
	что бы у логики была возможность вычислить то, где еще исключения не было.

	Когда код выполниться до конструкции if/else, а она к коде сервера одна, то проверим чтобы наш экземпляр
	модели вообще существовал, и если он существует то отдаем пользователю, даже если все поля будут null;

	Пользователь придется проверять все эти поля null / !null;

	Логика сервера Я так полагаю уже будет не изменна.

	Клиенткая сторона пока сделана на JS + jQuery

	Работает клиентская сторона хоть както пока только в IE у Меня 11 версия.
	В других браузерах открывает XML либо JSON файл с данными с сервера.

	 С уважением Дима. 