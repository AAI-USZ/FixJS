function(done){
    var uri = process.env.MONGOOSE_SET_TEST_URI;

    if (!uri) {
      console.log('\033[30m', '\n', 'You\'re not testing replica sets!'
                , '\n', 'Please set the MONGOOSE_SET_TEST_URI env variable.', '\n'
                , 'e.g: `mongodb://localhost:27017/db,mongodb://localhost…`', '\n'
                , '\033[39m');
      return done();
    }

    var mong = new Mongoose();

    mong.connectSet(uri, function (err) {
      assert.ifError(err);

      mong.model('Test', new mongoose.Schema({
          test: String
      }));

      var Test = mong.model('Test')
        , test = new Test();

      test.test = 'aa';
      test.save(function (err) {
        assert.ifError(err);

        Test.findById(test._id, function (err, doc) {
          assert.ifError(err);
          assert.equal('aa', doc.test);
          mong.connection.close();
          done();
        });
      });
    });
  }