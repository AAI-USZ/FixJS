function (err) {
              db.close();
              assert.ok(err);
              done();
            }