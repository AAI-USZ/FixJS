function (err, post) {
          should.strictEqual(err, null);

          post.fans.length.should.equal(3);
          post.fans[0].name.should.equal('aaron');
          post.fans[1].name.should.equal('fan2');
          post.fans[2].name.should.equal('someone else');

          P.findById(post)
          .populate('fans', 'name', null, { sort: [['name', -1]] })
          .run(function (err, post) {
            should.strictEqual(err, null);

            post.fans.length.should.equal(3);
            post.fans[2].name.should.equal('aaron');
            should.strictEqual(undefined, post.fans[2].age)
            post.fans[1].name.should.equal('fan2');
            should.strictEqual(undefined, post.fans[1].age)
            post.fans[0].name.should.equal('someone else');
            should.strictEqual(undefined, post.fans[0].age)

            P.findById(post)
            .populate('fans', 'age', { age: { $gt: 3 }}, { sort: [['name', 'desc']] })
            .run(function (err, post) {
              db.close();
              should.strictEqual(err, null);

              post.fans.length.should.equal(2);
              post.fans[1].age.valueOf().should.equal(10);
              post.fans[0].age.valueOf().should.equal(8);
            });
          });
        }