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

    // query, fields (empty string)
    BlogPostB.findOne(q, '', fn).should.be.an.instanceof(Query);

    // query, fields, options
    BlogPostB.findOne(q, {}, {}, fn).should.be.an.instanceof(Query);

    // query, fields (null), options
    BlogPostB.findOne(q, null, {}, fn).should.be.an.instanceof(Query);
  }