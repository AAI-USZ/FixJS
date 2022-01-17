function() {
    setup(function(done) {
      Places.db.open(function() {
        Places.db.clearPlaces(function() {
          Places.db.clearVisits(function() {
            Places.db.clearIcons(function() {
              done();
            });
          });
        });
      });
    });

    test('addPlace', function(done) {
      Places.addPlace('http://mozilla.org/test4', function() {
        done();
      });
    });

    test('setPageTitle', function(done) {
      Places.addPlace('http://mozilla.org/test5', function() {
        Places.setPageTitle('http://mozilla.org/test5',
          'Mozilla5', function() {
          Places.db.getPlace('http://mozilla.org/test5',
            function(place) {
            done(function() {
              assert.equal(place.title, 'Mozilla5');
            });
          });
        });
      });
    });

    test('setAndLoadIconForPage', function(done) {
      Places.setAndLoadIconForPage('http://mozilla.org/test6',
        ICON_URI, function() {
        Places.db.getIcon(ICON_URI, function(iconEntry) {
          done(function() {
            assert.equal(true, iconEntry.expiration > new Date().valueOf());
            var twoDaysAway = new Date().valueOf() + 172800000;
            assert.equal(true, iconEntry.expiration < twoDaysAway);
            assert.equal(2550, iconEntry.data.size);
            assert.equal('image/x-icon', iconEntry.data.type);
          });
        });
      });
    });

  }