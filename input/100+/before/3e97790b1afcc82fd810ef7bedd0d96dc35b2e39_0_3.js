function (done) {
    var db = start();
    var Movie = db.model('Movie');

    var super8 = new Movie({ title: 'Super 8' });

    var id1 = '4e3d5fc7da5d7eb635063c96';
    var id2 = '4e3d5fc7da5d7eb635063c97';
    var id3 = '4e3d5fc7da5d7eb635063c98';
    var id4 = '4e3d5fc7da5d7eb635063c99';

    super8.ratings.push({ stars: 9, _id: id1 });
    super8.ratings.push({ stars: 8, _id: id2 });
    super8.ratings.push({ stars: 7, _id: id3 });
    super8.ratings.push({ stars: 6, _id: id4 });
    //console.error('pre save', super8);

    super8.save(function (err) {
      assert.ifError(err);

      assert.equal(super8.title, 'Super 8');
      assert.equal(super8.ratings.id(id1).stars.valueOf(), 9);
      assert.equal(super8.ratings.id(id2).stars.valueOf(), 8);
      assert.equal(super8.ratings.id(id3).stars.valueOf(), 7);
      assert.equal(super8.ratings.id(id4).stars.valueOf(), 6);

      super8.ratings.id(id1).stars = 5;
      super8.ratings.id(id2).remove();
      super8.ratings.id(id3).stars = 4;
      super8.ratings.id(id4).stars = 3;

      super8.save(function (err) {
        assert.ifError(err);

        Movie.findById(super8._id, function (err, movie) {
          assert.ifError(err);

          assert.equal(movie.title, 'Super 8');
          assert.equal(movie.ratings.length,3);
          assert.equal(movie.ratings.id(id1).stars.valueOf(), 5);
          assert.equal(movie.ratings.id(id3).stars.valueOf(), 4);
          assert.equal(movie.ratings.id(id4).stars.valueOf(), 3);

          //console.error('after save + findbyId', movie);

          movie.ratings.id(id1).stars = 2;
          movie.ratings.id(id3).remove();
          movie.ratings.id(id4).stars = 1;

          //console.error('after modified', movie);

          movie.save(function (err) {
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
          });
        });
      });
    });
  }