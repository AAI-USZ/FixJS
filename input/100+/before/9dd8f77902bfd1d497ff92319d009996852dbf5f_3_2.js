function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection);

    // query
    BlogPostB.findOne({}).should.be.an.instanceof(Query);

    // query, fields
    BlogPostB.findOne({}, {}).should.be.an.instanceof(Query);

    // query, fields (array)
    BlogPostB.findOne({}, []).should.be.an.instanceof(Query);

    // query, fields, options
    BlogPostB.findOne({}, {}, {}).should.be.an.instanceof(Query);

    // query, fields (array), options
    BlogPostB.findOne({}, [], {}).should.be.an.instanceof(Query);

    db.close();
  }