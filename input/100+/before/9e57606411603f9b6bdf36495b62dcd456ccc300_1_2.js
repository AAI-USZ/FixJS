function () {
    // it('should request https success', function (done) {
    //   urllib.request('https://www.alipay.com/', function (err, data, res) {
    //     should.not.exist(err);
    //     res.should.status(200);
    //     done();
    //   });
    // });

    it('should 301', function (done) {
      urllib.request(host + '/301', function (err, data, res) {
        res.should.status(301);
        data.toString().should.equal('I am 301 body');
        done();
      });
    });
    it('should 302', function (done) {
      urllib.request(host + '/302', function (err, data, res) {
        res.should.status(302);
        done();
      });
    });
    it('should 500ms timeout', function (done) {
      urllib.request(host + '/timeout', { timeout: 450 }, function (err, data, res) {
        should.exist(err);
        err.name.should.equal('RequestTimeoutError');
        err.stack.should.match(/^RequestTimeoutError: socket hang up, request timeout for 450ms\./);
        err.code.should.equal('ECONNRESET');
        should.not.exist(data);
        should.not.exist(res);
        done();
      });
    });
    it('should error', function (done) {
      urllib.request(host + '/error', function (err, data, res) {
        should.exist(err);
        err.name.should.equal('RequestError');
        err.stack.should.match(/^RequestError: socket hang up/);
        err.code.should.equal('ECONNRESET');
        should.not.exist(data);
        should.not.exist(res);
        done();
      });
    });

    it('should get data', function (done) {
      var params = {
        type: 'get',
        data: {
          sql: 'SELECT * from table',
          data: '呵呵'
        }
      };
      urllib.request(host + '/get', params, function (err, data, res) {
        should.not.exist(err);
        res.should.status(200);
        var info = urlutil.parse(data.toString(), true);
        info.pathname.should.equal('/get');
        info.query.sql.should.equal(params.data.sql);
        info.query.data.should.equal(params.data.data);
        done();
      });
    });

    it('should post data', function (done) {
      var params = {
        type: 'POST',
        data: {
          sql: 'SELECT * from table',
          data: '哈哈'
        }
      };
      urllib.request(host + '/post', params, function (err, data, res) {
        should.not.exist(err);
        res.should.status(200);
        data = querystring.parse(data.toString());
        data.sql.should.equal(params.data.sql);
        data.data.should.equal(params.data.data);
        done();
      });
    });

    it('should post big data', function (done) {
      var bigdata = new Buffer(1024 * 1024);
      urllib.request(host + '/post', {
        type: 'post',
        content: bigdata
      }, function (err, data, res) {
        should.not.exist(err);
        res.should.status(200);
        data.should.length(bigdata.length);
        done();
      });
    });
  }