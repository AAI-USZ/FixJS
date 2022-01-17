function (err, post1, post2) {
        should.strictEqual(err, null);

        M.where('_id').in([post1, post2])
        .populate('fans', 'name', { gender: 'female' })
        .populate('users', 'name', { gender: 'male' })
        .populate('comments._creator', ['email'], { name: null })
        .run(function (err, posts) {
          db.close();
          should.strictEqual(err, null);

          should.exist(posts);
          posts.length.should.equal(2);
          var p1 = posts[0];
          var p2 = posts[1];
          should.strictEqual(p1.fans.length, 0);
          should.strictEqual(p2.fans.length, 1);
          p2.fans[0].name.should.equal('Fan 2');
          p2.fans[0].isInit('email').should.be.false;
          p2.fans[0].isInit('gender').should.be.false;
          p1.comments.length.should.equal(2);
          p2.comments.length.should.equal(2);
          should.exist(p1.comments[0]._creator.email);
          should.not.exist(p2.comments[0]._creator);
          p1.comments[0]._creator.email.should.equal('fan1@learnboost.com');
          p2.comments[1]._creator.email.should.equal('fan1@learnboost.com');
          p1.comments[0]._creator.isInit('name').should.be.false;
          p2.comments[1]._creator.isInit('name').should.be.false;
          p1.comments[0].content.should.equal('bejeah!');
          p2.comments[1].content.should.equal('world');
          should.not.exist(p1.comments[1]._creator);
          should.not.exist(p2.comments[0]._creator);
          p1.comments[1].content.should.equal('chickfila');
          p2.comments[0].content.should.equal('hello');
        });
      }