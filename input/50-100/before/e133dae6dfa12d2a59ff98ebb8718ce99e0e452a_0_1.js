function() {
      var model = Jax.Class.create(Jax.Model, {
        helpers: function() { return [helper]; }
      });
      expect(model.prototype.test_method).toEqual(helper.test_method);
    }