function() {
      var model = Jax.Class.create(Jax.Model, {});
      expect(model.prototype.test_method).toBeUndefined();
    }