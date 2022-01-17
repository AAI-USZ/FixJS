function (err) {
        assert.ok(/shard key/.test(err.message));

        P.update({ _id: ken._id, name: 'ken' }, { likes: ['kicking', 'punching'] }, function (err) {
          // mongo 2.x returns: can't do non-multi update with query that doesn't have a valid shard key
          if (greaterThan2x) {
            assert.ok(!err, err);
          } else {
            assert.ok(/shard key/.test(err.message));
          }

          P.update({ _id: ken._id, age: 27 }, { likes: ['kicking', 'punching'] }, function (err) {
            // mongo 2.x returns: can't do non-multi update with query that doesn't have a valid shard key
            if (greaterThan2x) {
              assert.ok(!err, err);
            } else {
              assert.ok(/shard key/.test(err.message));
            }

            P.update({ age: 27 }, { likes: ['kicking', 'punching'] }, function (err) {
              db.close();
              assert.ok(err);
              done();
            });
          });
        });
      }