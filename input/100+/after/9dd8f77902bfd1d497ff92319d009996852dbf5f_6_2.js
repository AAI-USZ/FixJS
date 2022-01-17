function (err, created) {
      should.strictEqual(err, null);
      var query = BlogPost.update({title: 'interoperable update as promise 2'}, {title: 'interoperable update as promise delta 2'});
      var promise = query.exec();
      promise.addBack(function (err) {
        should.strictEqual(err, null);
        BlogPost.count({title: 'interoperable update as promise delta 2'}, function (err, count) {
          should.strictEqual(err, null);
          count.should.equal(1);
          db.close();
        });
      });
    }