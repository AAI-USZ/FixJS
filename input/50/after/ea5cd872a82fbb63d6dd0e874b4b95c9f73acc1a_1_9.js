function (err, obj) {
                assert.isNull(err);
                assert.equal(obj.id, 'user/marak/haibu');
                assert.equal(obj.name, 'haibu');
                assert.equal(obj.user_id, 'marak');
              }