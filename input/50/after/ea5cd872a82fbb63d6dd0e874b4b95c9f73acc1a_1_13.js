function (err, obj) {
          assert.isNull(err);
          assert.equal(obj.id, 'user/christian/issues');
          assert.equal(obj.name, 'issues');
          assert.equal(obj.resource, 'Repository');
        }