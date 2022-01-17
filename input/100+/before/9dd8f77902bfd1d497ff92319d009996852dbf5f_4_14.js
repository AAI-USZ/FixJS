function (err, post) {
          should.strictEqual(err, null);

          BlogPost
            .findById(post._id)
            .populate('comments._creator', ['email'])
            .run(function (err, post) {
              db.close();
              should.strictEqual(err, null);

              post.comments[0]._creator.email.should.equal('user1@learnboost.com');
              post.comments[0]._creator.isInit('name').should.be.false;
              post.comments[1]._creator.email.should.equal('user2@learnboost.com');
              post.comments[1]._creator.isInit('name').should.be.false;
            });
        }