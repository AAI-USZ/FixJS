function(err, diff) {
      assert.ifError(err);
      assert.lengthOf(diff, 1);
      var diff0 = diff[0];
      assert.equal(diff0.type, 'change');
      assert.equal(diff0.before.path, diff0.after.path); 
      assert.equal(diff0.before.sha1, 'd7f0dbb626c1007fc9c98cb96a09636c76655ea0');
      assert.equal(diff0.after.sha1, '9e7d57c75f8ec3caf31156d5fbd19185e713e0ee');
    }