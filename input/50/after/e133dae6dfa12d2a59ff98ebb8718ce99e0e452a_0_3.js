function() {
      var model = Jax.Class.create(Jax.Model, {
        helpers: [helper]
      });
      expect(new model().test_method).toEqual(helper.test_method);
    }