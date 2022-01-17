function (err, s) {
      should.strictEqual(null, err);
      s.name.should.equal('the excluded');

      var pending = 2;
      function done (err, s) {
        --pending || db.close();
        if (Array.isArray(s)) s = s[0];
        should.strictEqual(null, err);
        s.isSelected('name').should.be.false;
        should.strictEqual(undefined, s.name);
      }

      S.findById(s).select('-thin').exec(done);
      S.find({ _id: s._id }).select('thin').exec(done);
    }