function (err, post1, post2) {
        should.strictEqual(err, null);

        BlogPost
        .find({ _id: { $in: [post1._id, post2._id ] } })
        .populate('fans', 'name')
        .exec(function (err, blogposts) {
          should.strictEqual(err, null);

          blogposts[0].fans[0].name.should.equal('Fan 1');
          blogposts[0].fans[0].isInit('email').should.be.false;
          blogposts[0].fans[1].name.should.equal('Fan 2');
          blogposts[0].fans[1].isInit('email').should.be.false;

          blogposts[1].fans[0].name.should.equal('Fan 2');
          blogposts[1].fans[0].isInit('email').should.be.false;
          blogposts[1].fans[1].name.should.equal('Fan 1');
          blogposts[1].fans[1].isInit('email').should.be.false;

          blogposts[1].fans = [fan3, fan4];

          blogposts[1].save(function (err) {
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
          });
        });
      }