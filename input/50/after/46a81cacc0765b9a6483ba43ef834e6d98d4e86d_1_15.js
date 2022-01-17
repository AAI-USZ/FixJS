function() {
        fs.unlinkSync(srcPath + '/tmp.js');
        compactDebug.middleware(['global'])(req, res, function() {
          done();
        });
      }