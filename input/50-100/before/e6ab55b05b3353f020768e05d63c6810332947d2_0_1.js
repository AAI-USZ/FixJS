function () {

       var poolSize = properties.poolSize || 1;

       delete properties.poolSize;

       for (var x = 0; x < poolSize; x += 1) {

           connectionPool.push({ 

               connection : mysql.createConnection(properties),

               cid : x // id соединения для дебага

           });

       };

    }