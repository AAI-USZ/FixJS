function (err, blogposts) {
                should.strictEqual(err, null);

                blogposts[0].fans.length.should.equal(1);
                blogposts[0].fans[0].gender.should.equal('female');
                blogposts[0].fans[0].name.should.equal('Fan 3');
                blogposts[0].fans[0].email.should.equal('fan3@learnboost.com');
                should.equal(blogposts[0].fans[0].age, 25);

                blogposts[1].fans.length.should.equal(1);
                blogposts[1].fans[0].gender.should.equal('female');
                blogposts[1].fans[0].name.should.equal('Fan 3');
                blogposts[1].fans[0].email.should.equal('fan3@learnboost.com');
                should.equal(blogposts[1].fans[0].age, 25);

                BlogPost
                .find({ _id: { $in: [post1._id, post2._id ] } })
                .populate('fans', 0, { gender: 'female' })
                .run(function (err, blogposts) {
                  db.close();
                  should.strictEqual(err, null);

                  blogposts[0].fans.length.should.equal(2);
                  blogposts[0].fans[0].gender.should.equal('female');
                  blogposts[0].fans[0].name.should.equal('Fan 2');
                  blogposts[0].fans[0].email.should.equal('fan2@learnboost.com');
                  blogposts[0].fans[1].gender.should.equal('female');
                  blogposts[0].fans[1].name.should.equal('Fan 3');
                  blogposts[0].fans[1].email.should.equal('fan3@learnboost.com');
                  should.equal(blogposts[0].fans[1].age, 25);

                  blogposts[1].fans.length.should.equal(2);
                  blogposts[1].fans[0].gender.should.equal('female');
                  blogposts[1].fans[0].name.should.equal('Fan 3');
                  blogposts[1].fans[0].email.should.equal('fan3@learnboost.com');
                  should.equal(blogposts[1].fans[0].age, 25);
                  blogposts[1].fans[1].gender.should.equal('female');
                  blogposts[1].fans[1].name.should.equal('Fan 2');
                  blogposts[1].fans[1].email.should.equal('fan2@learnboost.com');
                });
              }