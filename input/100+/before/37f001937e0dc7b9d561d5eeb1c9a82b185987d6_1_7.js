function (err, doc) {
              db.close();
              assert.ifError(err);
              assert.equal(undefined, doc.thin);
              assert.equal(undefined, doc.name);
              assert.equal(d.id, doc.id);
              done();
            }