function () {
    var db = start()
      , B = db.model('BlogPostB', collection)

    var post = new B({ title: '$option queries' });
    post.save(function (err) {
      should.strictEqual(null, err);
      B.findOne({ title: { $regex: ' QUERIES$', $options: 'i' }}, function (err, doc) {
        db.close();
        should.strictEqual(null, err, err && err.stack);
        doc.id.should.eql(post.id);
      })
    });
  }