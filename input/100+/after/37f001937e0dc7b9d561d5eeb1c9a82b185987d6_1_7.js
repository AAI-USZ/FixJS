function (err, doc) {
            assert.ifError(err);
            assert.equal(undefined, doc.thin);
            assert.equal('1 meter', doc.name);
            assert.equal(undefined, doc.docs[0].bool);
            assert.equal('test', doc.docs[0].name);
            assert.equal(d.id, doc.id);

            M.findById(d)
            .select('-thin -docs.bool')
            .exec(function (err, doc) {
              db.close();
              assert.ifError(err);
              assert.equal(undefined, doc.thin);
              assert.equal(undefined, doc.name);
              assert.equal(undefined, doc.docs[0].bool);
              assert.equal(undefined, doc.docs[0].name);
              assert.equal(d.id, doc.id);
              done();
            });
          }