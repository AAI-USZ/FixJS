function(){
        var mong = new Mongoose()
          , uri = 'mongodb://localhost/mongoose_test'

        mong.connect(process.env.MONGOOSE_TEST_URI || uri);
        var db = mong.connection;

        // forced failure
        db.close = function (cb) {
          cb(new Error('bam'));
        };

        var failure = {};
        try {
          mong.disconnect();
        } catch (err) {
          failure = err;
        }
        assert.equal('bam', failure.message);
      }