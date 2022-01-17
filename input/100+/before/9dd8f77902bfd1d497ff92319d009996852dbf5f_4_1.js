function (err, post) {
        should.strictEqual(err, null);

        BlogPost
          .findById(post._id)
          .populate('_creator', ['email'])
          .run(function (err, post) {
            db.close();
            should.strictEqual(err, null);

            post._creator.should.be.an.instanceof(User);
            post._creator.isInit('name').should.be.false;
            post._creator.email.should.equal('rauchg@gmail.com');
          });
      }