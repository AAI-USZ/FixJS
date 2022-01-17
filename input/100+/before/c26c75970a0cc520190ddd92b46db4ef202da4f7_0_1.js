function(err, dbInstance) {

          for (; idx < collections.length; idx++) {

            mongo.collectionNames(collections[idx], function(err, items) {
              var name = '';

              if (items.length) {
                name = items[0].name;
                mongo.dropCollection( name.slice(name.indexOf('.')+1) , function(err, result) {
                  expect(err).toBeFalsy();
                  dropped++;
                });
              } else {
                dropped++;
              }
            });
          }
        }