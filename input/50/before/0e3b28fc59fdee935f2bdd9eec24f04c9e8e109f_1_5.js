function (err, obj) {
                assert.isNull(err);
                assert.equal(obj.key, 'user/marak/support');
                assert.equal(obj.name, 'support');
                assert.equal(obj.user_id, 'marak');
              }