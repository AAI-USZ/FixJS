function (err, obj) {
                assert.isNull(err);
                assert.lengthOf(obj, 2);
                assert.equal(obj[0].key, 'user/pavan/bullet');
                assert.equal(obj[0].name, 'bullet');
                assert.equal(obj[1].key, 'user/pavan/octonode');
                assert.equal(obj[1].name, 'octonode');
              }