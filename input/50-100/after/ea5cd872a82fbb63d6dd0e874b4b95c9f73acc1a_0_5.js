function (err, obj) {
          assert.isNull(err);
          assert.strictEqual(obj.constructor, resources[e].Creature);
          assert.instanceOf(obj, resources[e].Creature);
          assert.equal(obj.id, 'han');
          assert.equal(obj.resource, 'Creature');
        }