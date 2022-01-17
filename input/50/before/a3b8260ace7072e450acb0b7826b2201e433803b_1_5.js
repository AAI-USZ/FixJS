function (err, obj) {
                assert.isNull(err);
                assert.equal(obj.key, 'user/christian/issues');
                assert.equal(obj.name, 'issues');
                assert.equal(obj.user_id, 'christian');
              }