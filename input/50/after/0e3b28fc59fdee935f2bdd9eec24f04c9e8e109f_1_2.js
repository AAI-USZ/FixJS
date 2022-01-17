function (err, obj) {
              assert.isNull(err);
              assert.equal(obj.key, 'user/marak/haibu');
              assert.equal(obj.name, 'haibu');
              assert.equal(obj.resource, 'Repository');
            }