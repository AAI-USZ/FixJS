function (err) {
          assert.ok(!err);

          P.update({ _id: ken._id, age: 27 }, { likes: ['kicking', 'punching'] }, function (err) {
            assert.ok(!err);

            P.update({ age: 27 }, { likes: ['kicking', 'punching'] }, function (err) {
              db.close();
              assert.ok(err);
              done();
            });
          });
        }