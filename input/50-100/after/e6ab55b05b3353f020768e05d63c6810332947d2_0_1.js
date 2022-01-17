function (properties) {

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

    }