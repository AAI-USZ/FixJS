function() {
        Places.db.getIcon(DATA_URI, function(iconEntry) {
          done(function() {
            assert.equal(true, iconEntry.expiration > new Date().valueOf());
            var twoDaysAway = new Date().valueOf() + 172800000;
            assert.equal(true, iconEntry.expiration < twoDaysAway);
            assert.equal(2550, iconEntry.data.size);
            assert.equal('image/x-icon', iconEntry.data.type);
          });
        });
      }