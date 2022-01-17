function (err, post) {
          should.strictEqual(err, null);
          should.strictEqual(post._creator, null);

          BlogPost
          .findById(post._id)
          .populate('_creator', 'email', { name: 'Banana' })
          .exec(function (err, post) {
            db.close();
            should.strictEqual(err, null);
            post._creator.should.be.an.instanceof(User);
            post._creator.isInit('name').should.be.false;
            post._creator.email.should.equal('cats@example.com');
          });
        }