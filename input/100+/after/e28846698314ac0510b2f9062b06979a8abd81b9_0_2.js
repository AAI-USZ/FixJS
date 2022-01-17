function() {
    var testData = {yay: true}, folderName = idgen();
    before(function(done) {
      fs.mkdir(testFolder + '/folder/' + folderName, function(err) {
        assert.ifError(err);
        fs.writeFile(testFolder + '/folder/' + folderName + '/test.json', JSON.stringify(testData), function(err) {
          assert.ifError(err);
          // Give time for the watcher to pick it up
          setTimeout(function() {
            done();
          }, 1000);
        });
      });
    });

    it('serves a dynamically created file', function(done) {
      var req = http.get(baseUrl + '/folder/' + folderName + '/test.json', function(res) {
        assert.equal(res.statusCode, 200);
        assert.equal(res.headers['content-type'], 'application/json');

        var data = '';
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
          data += chunk;
        });
        res.on('end', function() {
          assert.deepEqual(JSON.parse(data), testData);
          done();
        });
      }).on('error', assert.ifError);
      req.end();
    });

    it('serves a 404 after removing dynamic file', function(done) {
      rimraf(testFolder + '/folder/' + folderName, function(err) {
        assert.ifError(err);
        setTimeout(function() {
          var req = http.get(baseUrl + '/folder/' + folderName + '/test.json', function(res) {
          assert.equal(res.statusCode, 404);
          assert.equal(res.headers['content-type'], 'text/plain');

          var data = '';
          res.setEncoding('utf8');
          res.on('data', function(chunk) {
            data += chunk;
          });
          res.on('end', function() {
            assert.equal(data, 'file not found');
            done();
          });
        }).on('error', assert.ifError);
        req.end();
        }, 1000);
      });
    });

    it("doesn't serve a .-prefixed file", function(done) {
      var req = http.get(baseUrl + '/.htaccess', function(res) {
        assert.equal(res.statusCode, 404);
        assert.equal(res.headers['content-type'], 'text/plain');

        var data = '';
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
          data += chunk;
        });
        res.on('end', function() {
          assert.equal(data, 'file not found');
          done();
        });
      }).on('error', assert.ifError);
      req.end();
    });
  }