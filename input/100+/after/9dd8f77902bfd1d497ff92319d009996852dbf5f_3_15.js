function (err, s) {
      should.strictEqual(null, err);
      s.name.should.equal('the included');

      var pending = 2;
      function done (err, s) {
        --pending || db.close();
        if (Array.isArray(s)) s = s[0];
        should.strictEqual(null, err);
        s.isSelected('name').should.be.true;
        s.name.should.equal('the included');
      }

      S.findById(s).select('-thin').exec(done);
      S.find({ _id: s._id }).select('thin').exec(done);
    }