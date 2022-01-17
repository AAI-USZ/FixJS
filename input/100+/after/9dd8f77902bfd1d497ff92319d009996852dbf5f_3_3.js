function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection)
      , count = 5
      , q =  { _id: new DocumentObjectId }; // make sure the query is fast

    function fn () {
      --count || db.close();
    };

    // query
    BlogPostB.find(q, fn).should.be.an.instanceof(Query);

    // query, fields (object)
    BlogPostB.find(q, {}, fn).should.be.an.instanceof(Query);

    // query, fields (null)
    BlogPostB.find(q, null, fn).should.be.an.instanceof(Query);

    // query, fields, options
    BlogPostB.find(q, {}, {}, fn).should.be.an.instanceof(Query);

    // query, fields (''), options
    BlogPostB.find(q, '', {}, fn).should.be.an.instanceof(Query);
  }