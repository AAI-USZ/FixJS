function (err, obj) {
                assert.isNull(err);
                assert.lengthOf(obj, 2);
                assert.equal(obj[0].id, 'user/pavan/bullet');
                assert.equal(obj[0].name, 'bullet');
                assert.equal(obj[1].id, 'user/pavan/octonode');
                assert.equal(obj[1].name, 'octonode');
              }