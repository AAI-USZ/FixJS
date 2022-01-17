function() {
              // check that each store now exists
              var stores = subject.connection.objectStoreNames;
              var actualStore;
              for (actualStore in subject.stores) {
                assert.ok(
                  (stores.contains(actualStore)),
                  actualStore + ' was not created'
                );
              }
            }