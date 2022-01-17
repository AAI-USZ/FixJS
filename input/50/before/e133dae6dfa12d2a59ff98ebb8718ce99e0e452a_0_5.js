function() {
      var controller = Jax.Controller.create({
        helpers: function() { return [helper]; }
      });
      expect(controller.prototype.test_method).toEqual(helper.test_method);
    }