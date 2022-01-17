function() {
      var model = Jax.Class.create(Jax.Model, {
        helpers: [helper]
      });
      expect(model.prototype.test_method).toEqual(helper.test_method);
    }