function(err, servers) {
    // Select a secondary server, but specify read_primary (should fail)
    // Let's grab a secondary server
    var host = servers.secondaries[0].host;
    var port = servers.secondaries[0].port;

    // Connect to the db
    var server = new Server(host, port,{auto_reconnect: true, readPreference:Server.READ_PRIMARY});
    // Create db instance
    var db = new Db('integration_test_', server, {native_parser: (process.env['TEST_NATIVE'] != null)});
    db.open(function(err, p_db) {
      // Grab the collection
      p_db.collection("read_preference_single_test_1", function(err, collection) {
        // Attempt to read (should fail due to the server not being a primary);
        collection.find().toArray(function(err, items) {
          test.ok(err instanceof Error);
          test.equal("Read preference is Server.PRIMARY and server is not master", err.message);
          p_db.close();

          // Connect to the db
          var server = new Server(host, port,{auto_reconnect: true, readPreference:Server.READ_SECONDARY});
          // Create db instance
          var db = new Db('integration_test_', server, {slave_ok:true, native_parser: (process.env['TEST_NATIVE'] != null)});
          db.open(function(err, p_db) {
            // Grab the collection
            db.collection("read_preference_single_test_1", function(err, collection) {
              // Attempt to read (should fail due to the server not being a primary);
              collection.find().toArray(function(err, items) {
                test.equal(null, err);
                test.equal(0, items.length);
                p_db.close();

                // Connect to the db
                var server = new Server(host, port,{auto_reconnect: true, readPreference:Server.READ_SECONDARY_ONLY});
                // Create db instance
                var db = new Db('integration_test_', server, {slave_ok:true, native_parser: (process.env['TEST_NATIVE'] != null)});
                db.open(function(err, p_db) {
                  // Grab the collection
                  db.collection("read_preference_single_test_1", function(err, collection) {
                    // Attempt to read (should fail due to the server not being a primary);
                    collection.find().toArray(function(err, items) {
                      test.equal(null, err);
                      test.equal(0, items.length);

                      p_db.close();
                      test.done();
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }