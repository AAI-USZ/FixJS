function (err, movie) {
          assert.ifError(err);

          assert.equal(movie.title, 'Super 8');
          assert.equal(movie.ratings.length,3);
          assert.equal(movie.ratings.id(id1).stars.valueOf(), 5);
          assert.equal(movie.ratings.id(id3).stars.valueOf(), 4);
          assert.equal(movie.ratings.id(id4).stars.valueOf(), 3);

          movie.ratings.id(id1).stars = 2;
          movie.ratings.id(id3).remove();
          movie.ratings.id(id4).stars = 1;

          movie.save(function (err) {
            assert.ifError(err);

            Movie.findById(super8._id, function (err, movie) {
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
            });
          });
        }