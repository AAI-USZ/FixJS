function (err, obj) {
            assert.isNull(err);
            assert.equal(obj[0].resource, 'Repository');
            assert.equal(obj[1].resource, 'Repository');
          }