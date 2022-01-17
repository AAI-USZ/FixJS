function (properties) {

    var mysql = require('mysql');

    var connectionPool = initPool(properties);

    var mainQueue = [];

   

    var _initPool = function (properties) {

       var pool = [];

       var poolSize = properties.poolSize || 1;

       delete properties.poolSize;

       for (var x = 0; x < poolSize; x += 1) {

           pool.push({ 

               connection : mysql.createConnection(properties),

               cid : x // id соединения для дебага

           });

       };

       return pool;

    };



    var resumeConnection = function(connection) { /* Функция возращает соединение в пул и активирует очередь */

        delete connection.query; /* Удаляем метод обертку у использованного соединения */

        connection.query = connection._originalQuery; /* Возвращаем оригинальный метод */

        connectionPool.push(connection); /* Соединение вернулось в пул и готова к исполнению новых запросов */

        if (mainQueue.length) { 

            process.nextTick(function () {

                this.getConnection(mainQueue.shift());

            }.bind(this));

        };

    };



    this.getConnection = function(callback) {

        if (connectionPool.length) { /* Проверяем пул на наличее свободных соединений */

            var connection = connectionPool.pop(); /* Берем соединение с конца (потомучто так быстрее) */

            connection._originalQuery = connection.query;

            connection.query = function (sql, params, callback) { /* Метод обертка для вызова оригинального метода query */

                if (typeof params == "function") {

                    callback = params;

                    params = undefined;

                };

                connection._originalQuery(sql, params || [], function() { /* Обертка оригинальноо колбэка, ядро пула */ 

                    if (arguments[0] !== null || connection._protocol._queue.length == 1) { /* Проверяем внутреннию очередь для текущего соединения */

                        resumeConnection(connection);

                    }

                    if (callback) 

                        callback.apply(connection, arguments); 

                });

            };

            callback(connection); /* Передаем полученное соединение в функцию исполнения запросов */

        } else {

            mainQueue.push(callback); /* Иначе добавляем к очереди */

        };

    };

}