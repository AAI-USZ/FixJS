function(done){
    var uri = process.env.MONGOOSE_SET_TEST_URI;

    if (!uri) return done();

    var mong = new Mongoose();

    var conn = mong.createSetConnection(uri, function (err) {
      assert.ifError(err);

      mong.model('ReplSetTwo', new mongoose.Schema({
          test: String
      }));

      var Test = conn.model('ReplSetTwo')
        , test = new Test();

      test.test = 'aa';
      test.save(function (err) {
        assert.ifError(err);

        Test.findById(test._id, function (err, doc) {
          assert.ifError(err);
          assert.equal('aa', doc.test);
          conn.close();
          done();
        });
      });
    });
  }