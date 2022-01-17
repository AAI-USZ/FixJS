function (err) {
            db.close();
            should.strictEqual(null, err);
            zang._shardval.name.should.equal('Zangief');
            zang._shardval.age.should.equal(33);
          }