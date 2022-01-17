function (err, obj) {
          assert.isNull(err);
          assert.equal(obj.key, 'user/pavan/bullet');
          assert.equal(obj.name, 'bullet');
          assert.equal(obj.resource, 'Repository');
        }