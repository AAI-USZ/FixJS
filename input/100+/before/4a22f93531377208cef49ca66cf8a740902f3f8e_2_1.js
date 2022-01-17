function (err, doc) {
          db.close();
          should.strictEqual(null, err);
          should.not.exist(doc.ignore);
          should.not.exist(doc._doc.ignore);
        }