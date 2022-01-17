function (err, obj) {
            assert.isNull(err);
            assert.isArray(obj);
            assert.instanceOf(obj[0], resourceful.Resource);
            assert.instanceOf(obj[1], resourceful.Resource);
            assert.equal(obj[0].id, 'bob');
            assert.equal(obj[0].age, 35);
            assert.equal(obj[0].hair, 'black');
            assert.equal(obj[0].resource, 'Author');
            assert.equal(obj[1].id, 'mat');
            assert.equal(obj[1].age, 29);
            assert.equal(obj[1].hair, 'black');
            assert.equal(obj[1].resource, 'Author');
          }