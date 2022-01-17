function()  {
    var db = start()
    , BlogPostB = db.model('BlogPostB', collection)
    , title = 'Wooooot ' + random();

    var post = new BlogPostB();
    post.set('title', title);

    post.save(function (err) {
      should.strictEqual(null, err);
      var found = 0;
      BlogPostB.find({title : title}, null, { lean : true })
        .each(function(err, doc){
          should.strictEqual(null, err);
          if(doc) {
            doc.should.not.be.equal(undefined);
            should.strictEqual(doc instanceof mongoose.Document, false);
            found++
          }  else {
            should.strictEqual(found, 1);
            db.close();
          }
      });
    });
  }