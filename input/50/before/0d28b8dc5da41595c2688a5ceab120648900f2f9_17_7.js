function() {
          assert.equal(object._id, id);
          assert.equal(subject._accounts[id], object);
          assert.deepEqual(result.providerType, object.providerType);
        }