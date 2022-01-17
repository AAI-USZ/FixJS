function(done) {
      var compact = require('../../compact').createCompact({ srcPath: srcPath, destPath: destPath + '/invalid-dest' });
      setTimeout(function () {
        path.existsSync(destPath + '/invalid-dest').should.equal(true);
        done();
      }, 10);
    }