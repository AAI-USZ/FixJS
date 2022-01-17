function (err, obj) {
            assert.isNull(err);
            assert.equal(obj[0].name, 'nodejitsu');
            assert.equal(obj[1].name, 'flatiron');
            assert.equal(obj[0].resource, 'Forum');
            assert.equal(obj[1].resource, 'Forum');
          }