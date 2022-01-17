function() {
        done(function() {
          assert.ok(!subject.cached[id]);

          var keys = Object.keys(calStore.cached);
          var accountKeys = Object.keys(
            calStore.remotesByAccount(id)
          );

          assert.equal(accountKeys.length, 0);
          assert.equal(keys.length, 1);
        });
      }