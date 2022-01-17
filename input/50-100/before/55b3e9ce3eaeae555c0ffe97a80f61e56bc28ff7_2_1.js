function(done) {
      var place = {
        uri: 'http://mozilla.org/test3',
        title: 'Mozilla'
      };
      Places.db.savePlace(place, function() {
        place.title = 'Mozilla3';
        Places.db.updatePlace(place, function() {
          Places.db.getPlace('http://mozilla.org/test3',
            function(place) {
            done(function() {
              assert.equal(place.title, 'Mozilla3');
            });
          });
        });
      });

    }