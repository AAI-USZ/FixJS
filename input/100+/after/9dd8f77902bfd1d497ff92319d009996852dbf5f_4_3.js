function (err, post) {
            should.strictEqual(err, null);

            post._creator.should.be.an.instanceof(User);
            post._creator.name.should.equal('Guillermo');
            post._creator.email.should.equal('rauchg@gmail.com');

            User.create({
                name  : 'Aaron'
              , email : 'aaron@learnboost.com'
            }, function (err, newCreator) {
              should.strictEqual(err, null);

              post._creator = newCreator._id;
              post.save(function (err) {
                should.strictEqual(err, null);

                BlogPost
                  .findById(post._id)
                  .populate('_creator')
                  .exec(function (err, post) {
                    db.close();
                    should.strictEqual(err, null);

                    post._creator.name.should.equal('Aaron');
                    post._creator.email.should.equal('aaron@learnboost.com');
                  });
              });
            });
          }