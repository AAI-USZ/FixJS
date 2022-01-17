function loadFixtureData() {
        var isReady = false;

        if (fixturesLoaded) return;

        runs(function() {

          mongo.open(function(err, connection) {
            var links = mongo.collection('links');
            links.insert(fixtures, { safe: true }, function(err) {

              // Make sure the insert worked correctly
              expect(err).toBeNull();
              isReady = true;

            });
          });
        });

        waitsFor(function() {
          // Loaded fixture data
          return isReady;
        });

        runs(function() {
          fixturesLoaded = true;
        });
      }