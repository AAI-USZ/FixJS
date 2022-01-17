function() {
          var i = 0,
              col = null;

          var verifyEmptyCollection = function(collection) {
            collection.find().count(function(err, count) {
              expect(err).toBeFalsy();
              expect(count).toBe(0);
              tested++;
            });
          };

          var verifyCollections = {

            'counter': function() {
              mongo.collection('counter').find().toArray(function(err, docs) {
                // The counter collection should be initialized with a value
                expect(err).toBeFalsy();
                expect(docs.length).toBe(1);
                expect(docs[0].tbl).toEqual('links');
                expect(docs[0].c).toBe(0);
                tested++;
              })
            },

            'errLog': function() {
              var errLog = mongo.collection('errLog');

              errLog.options(function(err, options) {
                expect(options.capped).toBe(true);
                expect(options.size).toBe(10485760);

                verifyEmptyCollection(errLog);
              });
            },

            'actLog': function() {
              var actLog = mongo.collection('actLog');

              actLog.options(function(err, options) {
                expect(options.capped).toBe(true);
                expect(options.size).toBe(52428800);

                verifyEmptyCollection(actLog);
              });
            },

            'links': function() {
              verifyEmptyCollection( mongo.collection('links') );
            }
          }

          // Now examine each collection
          for (; i < collections.length; i++) {
            verifyCollections[ collections[i] ]();
          }
        }