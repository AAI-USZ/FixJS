function(done){
      var mong = new Mongoose()
        , uri = 'mongodb://localhost/mongoose_test'

      mong.connect(process.env.MONGOOSE_TEST_URI || uri);

      mong.connection.on('open', function () {
        mong.disconnect(function () {
          done();
        });
      });
    }