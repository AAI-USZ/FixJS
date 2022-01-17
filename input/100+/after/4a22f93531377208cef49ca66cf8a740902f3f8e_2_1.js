function (err, doc) {
          should.strictEqual(null, err);
          should.not.exist(doc.ignore);
          should.not.exist(doc._doc.ignore);

          S.update({ _id: s._id }, { name: 'Drukqs', foo: 'fooey' }, function (err, affected) {
            should.strictEqual(null, err);
            affected.should.equal(1);

            S.findById(s._id, function (err, doc) {
              db.close();
              should.strictEqual(null, err);
              should.not.exist(doc._doc.foo);
            });
          });
        }