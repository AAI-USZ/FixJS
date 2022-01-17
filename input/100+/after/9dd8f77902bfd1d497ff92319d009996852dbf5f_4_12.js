function (err) {
            should.strictEqual(err, null);

            BlogPost
            .findById(blogposts[1]._id, '', { populate: ['fans'] })
            .exec(function (err, post) {
              should.strictEqual(err, null);

              post.fans[0].name.should.equal('Fan 3');
              post.fans[1].name.should.equal('Fan 4');

              post.fans.splice(0, 1);
              post.save(function (err) {
                should.strictEqual(err, null);

                BlogPost
                .findById(post._id)
                .populate('fans')
                .exec(function (err, post) {
                  db.close();
                  should.strictEqual(err, null);
                  post.fans.length.should.equal(1);
                  post.fans[0].name.should.equal('Fan 4');
                });
              });
            });
          }