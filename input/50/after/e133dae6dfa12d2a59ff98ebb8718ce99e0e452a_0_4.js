function() {
      var model = Jax.Class.create(Jax.Model, {});
      expect(new model().test_method).toBeUndefined();
    }