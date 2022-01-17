function () {
    var db = start()
      , BlogPostB = db.model('BlogPostB', collection)
      , count = 5
      , q =  { _id: new DocumentObjectId }; // make sure the query is fast

    function fn () {
      --count || db.close();
    };

    // query
    BlogPostB.findOne(q, fn).should.be.an.instanceof(Query);

    // query, fields
    BlogPostB.findOne(q, {}, fn).should.be.an.instanceof(Query);

    // query, fields (array)
    BlogPostB.findOne(q, [], fn).should.be.an.instanceof(Query);

    // query, fields, options
    BlogPostB.findOne(q, {}, {}, fn).should.be.an.instanceof(Query);

    // query, fields (array), options
    BlogPostB.findOne(q, [], {}, fn).should.be.an.instanceof(Query);
  }