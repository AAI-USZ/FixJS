function() {
    suite('on version change', function() {
      // db should be destroyed at this point

      test('creation of stores', function(done) {
        var finishedOpen = false;

        assert.ok(!subject.connection, 'connection should be closed');

        subject.on('open', function() {
          if (!finishedOpen) {
            done(new Error(
              'fired callback/event out of order ' +
              'callback should fire then events'
            ));
          } else {
            done(function() {
              // check that each store now exists
              var stores = subject.connection.objectStoreNames;
              var actualStore;
              for (actualStore in subject.store) {
                assert.ok(
                  (stores.contains(actualStore)),
                  actualStore + ' was not created'
                );
              }
            });
          }
        });

        subject.open(function() {
          assert.ok(subject.connection);
          assert.equal(subject.connection.name, name);
          finishedOpen = true;
        });
      });
    });

    suite('after version change', function() {

      setup(function(done) {
        // make sure db is open
        subject.open(function() {
          done();
        });
      });

      test('open', function(done) {
        // close it
        subject.close();
        subject = new Calendar.Db(subject.name);

        subject.open(function() {
          done();
        });
      });

    });

  }