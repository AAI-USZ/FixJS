function (err, movie) {
              assert.ifError(err);
              assert.equal(movie.ratings.length,2);
              assert.equal(movie.ratings.id(id1).stars.valueOf(), 2);
              assert.equal(movie.ratings.id(id4).stars.valueOf(), 1);

              // gh-531
              movie.ratings[0].remove();
              movie.ratings[0].remove();
              movie.save(function (err) {
                Movie.findById(super8._id, function (err, movie) {
                  db.close();
                  assert.ifError(err);
                  assert.equal(0, movie.ratings.length);
                  done();
                });
              });
            }