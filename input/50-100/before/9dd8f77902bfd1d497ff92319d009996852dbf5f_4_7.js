function (err, post) {
      should.strictEqual(err, null);

      BlogPost
      .findById(post._id)
      .populate('comments._creator', ['email'])
      .run(function (err, returned) {
        db.close();
        worked = true;
        should.strictEqual(err, null);
        returned.id.should.equal(post.id);
      });
    }