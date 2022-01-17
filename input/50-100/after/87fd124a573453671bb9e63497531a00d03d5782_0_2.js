function(connection) { /* Функция возращает соединение в пул и активирует очередь */

        delete connection.query; /* Удаляем метод обертку у использованного соединения */

        connection.query = connection._originalQuery; /* Возвращаем оригинальный метод */

        connectionPool.push(connection); /* Соединение вернулось в пул и готова к исполнению новых запросов */

        if (mainQueue.length) { 

            process.nextTick(function () {

                this.getConnection(mainQueue.shift());

            }.bind(this));

        };

    }