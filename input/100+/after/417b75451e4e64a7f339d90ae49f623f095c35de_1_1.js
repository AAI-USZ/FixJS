function(err, result, object) {
            console.dir(object)
            test.equal(2, result.a);
            test.equal(2, result.b);

            // Test remove object on change
            collection.insert({'a':3, 'b':2}, {safe:true}, function(err, doc) {
              // Let's modify the document in place
              collection.findAndModify({'a':3}, [], {'$set':{'b':3}}, {'new': true, remove: true}, function(err, updated_doc) {
                test.equal(3, updated_doc.a);
                test.equal(2, updated_doc.b);

                // Let's upsert!
                collection.findAndModify({'a':4}, [], {'$set':{'b':3}}, {'new': true, upsert: true}, function(err, updated_doc) {
                  test.equal(4, updated_doc.a);
                  test.equal(3, updated_doc.b);

                  // Test selecting a subset of fields
                  collection.insert({a: 100, b: 101}, {safe:true}, function (err, ids) {
                    collection.findAndModify({'a': 100}, [], {'$set': {'b': 5}}, {'new': true, fields: {b: 1}}, function (err, updated_doc) {
                      test.equal(2, Object.keys(updated_doc).length);
                      test.equal(ids[0]['_id'].toHexString(), updated_doc._id.toHexString());
                      test.equal(5, updated_doc.b);
                      test.equal("undefined", typeof updated_doc.a);
                      test.done();
                    });
                  });
                });                    
              })
            });                
          }