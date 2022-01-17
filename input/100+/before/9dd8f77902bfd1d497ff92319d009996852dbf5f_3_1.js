function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection);

    // query
    BlogPostB.find({}).should.be.an.instanceof(Query);

    // query, fields
    BlogPostB.find({}, {}).should.be.an.instanceof(Query);

    // query, fields (array)
    BlogPostB.find({}, []).should.be.an.instanceof(Query);

    // query, fields, options
    BlogPostB.find({}, {}, {}).should.be.an.instanceof(Query);

    // query, fields (array), options
    BlogPostB.find({}, [], {}).should.be.an.instanceof(Query);

    db.close();
  }