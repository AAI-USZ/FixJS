function(done){
      var mong = new Mongoose()
        , uri = 'mongodb://localhost/mongoose_test'
        , connections = 0
        , disconnections = 0
        , pending = 4;

      mong.connect(process.env.MONGOOSE_TEST_URI || uri);
      var db = mong.connection;

      function cb () {
        if (--pending) return;
        assert.equal(2, connections);
        assert.equal(2, disconnections);
        done();
      }

      db.on('open', function(){
        connections++;
        cb();
      });

      db.on('close', function () {
        disconnections++;
        cb();
      });

      var db2 = mong.createConnection(process.env.MONGOOSE_TEST_URI || uri);

      db2.on('open', function () {
        connections++;
        cb();
      });

      db2.on('close', function () {
        disconnections++;
        cb();
      });

      mong.disconnect();
    }