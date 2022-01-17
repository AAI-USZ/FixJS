function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection);

    BlogPostB.create({title: "The Wrestler", tags: ["movie"]}, function (err, wrestler) {
      should.strictEqual(err, null);
      BlogPostB.create({title: "Black Swan", tags: ["movie"]}, function (err, blackswan) {
        should.strictEqual(err, null);
        BlogPostB.create({title: "Pi", tags: ["movie"]}, function (err, pi) {
          should.strictEqual(err, null);
          var found = {};
          BlogPostB
            .find({tags: "movie"})
            .sort('title', -1)
            .each(function (err, post) {
              should.strictEqual(err, null);
              if (post) found[post.title] = 1;
              else {
                found.should.have.property("The Wrestler", 1);
                found.should.have.property("Black Swan", 1);
                found.should.have.property("Pi", 1);
                db.close();
              }
            });
        });
      });
    });
  }