function() {
      var controller = Jax.Controller.create({});
      expect(controller.prototype.test_method).toBeUndefined();
    }