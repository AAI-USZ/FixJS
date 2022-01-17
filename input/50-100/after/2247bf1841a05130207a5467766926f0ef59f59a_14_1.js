function (err, admin) {
          assert.ifError(err);
          admin.serverStatus(function (err, info) {
            assert.ifError(err);
            version = info.version.split('.').map(function(n){return parseInt(n, 10) });
            greaterThan2x = 2 < version[0];
            done();
          });
        }