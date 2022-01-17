function() {
      var compact = require('../../compact').createCompact({ srcPath: srcPath, destPath: destPath + '/invalid-dest' });
      path.existsSync(destPath + '/invalid-dest').should.equal(true);
    }