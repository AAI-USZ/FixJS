function(done) {
      var uri = 'http://mozilla.org/test4';
      Places.db.updatePlaceScreenshot(uri, DATA_URI, function() {
        Places.db.getPlace(uri, function(place) {
          done(function() {
            assert.equal(place.screenshot, DATA_URI);
          });
        });
      });
    }