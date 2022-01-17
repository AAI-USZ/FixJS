function(){
    it('are allowed with replsets', function(){
      var conn = mongoose.createSetConnection('localhost:12345,127.0.0.1:14326', function (err) {
        // force missing db error so we don't actually connect.
        assert.ok(err);
      });
      assert.deepEqual(['localhost', '127.0.0.1'], conn.host);
      assert.deepEqual([12345, 14326], conn.port);
    })
    it('are allowed with single connections', function(){
      var conn = mongoose.createConnection();
      conn.doOpen = function(){};
      conn.open('localhost:12345/woot');
      assert.deepEqual('localhost', conn.host);
      assert.deepEqual(12345, conn.port);
    })

  }