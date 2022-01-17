function (err, found) {
        should.strictEqual(err, null);
        found.length.should.equal(2);
        found[0].id;
        found[1].id;
        found[0]._id.should.eql(createdOne._id);
        found[1]._id.should.eql(createdTwo._id);
        db.close();
      }