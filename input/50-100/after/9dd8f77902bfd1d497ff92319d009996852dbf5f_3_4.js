function (err, found) {
              should.strictEqual(err, null);
              found.id;
              found._id.should.eql(created._id);

              BlogPostB.where('title').regex(/^Next/).findOne(function (err, found) {
                db.close();
                should.strictEqual(err, null);
                found.id;
                found._id.should.eql(created._id);
              });
            }