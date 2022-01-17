function (err) {
            assert.ifError(err);

            Movie.findById(super8._id, function (err, movie) {
              db.close();
              assert.ifError(err);
              assert.equal(movie.ratings.length,2);
              assert.equal(movie.ratings.id(id1).stars.valueOf(), 2);
              assert.equal(movie.ratings.id(id4).stars.valueOf(), 1);
              //console.error('after resave + findById', movie);
              done();
            });
          }