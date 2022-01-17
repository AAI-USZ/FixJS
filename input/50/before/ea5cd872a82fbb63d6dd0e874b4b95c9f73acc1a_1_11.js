function (err, obj) {
            assert.isNull(err);
            assert.equal(obj.key, 'pavan');
            assert.equal(obj.name, 'pavan');
          }