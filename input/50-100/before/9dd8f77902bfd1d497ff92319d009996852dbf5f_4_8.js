function (err) {
          should.strictEqual(err, undefined);

          BlogPost
          .findById(post._id)
          .populate('fans', ['name'])
          .run(function (err, returned) {
            db.close();
            should.strictEqual(err, null);
            returned.id.should.equal(post.id);
            returned.fans.length.should.equal(1);
          });
        }