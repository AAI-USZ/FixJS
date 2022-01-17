function () {
            var t = new T({ type: "monster" });

            var worked = false;
            t.save(function (err) {
              assert.equal(err.message, 'no open connections');
              worked = true;
            });

            db.db.close();

            setTimeout(function () {
              assert.ok(worked);
              done();
            }, 500);
          }