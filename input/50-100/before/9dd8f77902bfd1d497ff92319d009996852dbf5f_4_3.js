function (err) {
              should.strictEqual(err, null);

              BlogPost
              .findById(post._id)
              .populate('_creator', {email: 0})
              .run(function (err, post) {
                db.close();
                should.strictEqual(err, null);

                post._creator.name.should.equal('Aaron');
                should.not.exist(post._creator.email);
              });
            }