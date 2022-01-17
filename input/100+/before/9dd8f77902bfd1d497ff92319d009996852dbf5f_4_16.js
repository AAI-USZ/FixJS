function (err, post) {
            should.strictEqual(err, null);
            should.exist(post);
            post.comments.length.should.equal(2);
            should.strictEqual(post.comments[0]._creator, null);
            post.comments[1]._creator.toString().should.equal(user2.id);

            // subprop is null in a doc
            BlogPost
            .findById(post._id)
            .populate('comments._creator', 'email')
            .run(function (err, post) {
              db.close();
              should.strictEqual(err, null);

              should.exist(post);
              post.comments.length.should.equal(2);
              should.strictEqual(post.comments[0]._creator, null);
              should.strictEqual(post.comments[0].content, 'Woot woot');
              post.comments[1]._creator.email.should.equal('terminator1000@learnboost.com');
              post.comments[1]._creator.isInit('name').should.be.false;
              post.comments[1].content.should.equal('Wha wha');
            });
          }