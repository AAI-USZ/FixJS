function (err, obj) {
          assert.isNull(err);
          assert.equal(obj.id, 'pavan');
          assert.equal(obj.name, 'pavan');
          assert.equal(obj.resource, 'User');
        }