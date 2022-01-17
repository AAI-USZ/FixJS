function(done) {
      var place1 = {
        uri: 'http://mozilla.org/test1',
        frecency: 3
      };
      var place2 = {
        uri: 'http://mozilla.org/test2',
        frecency: 2
      };
      var place3 = {
        uri: 'http://mozilla.org/test3',
        frecency: 1
      };
      Places.db.updatePlace(place1, function() {
        Places.db.updatePlace(place2, function() {
          Places.db.updatePlace(place3, function() {
            Places.db.getPlacesByFrecency(2, function(topSites) {
              done(function() {
                assert.equal(2, topSites.length);
                assert.equal(topSites[0].uri, 'http://mozilla.org/test1');
              });
            });
          });
        });
      });
    }