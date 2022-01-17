function() {
      var controller = Jax.Controller.create({
        helpers: function() { return [helper]; }
      });
      expect(new controller().test_method).toEqual(helper.test_method);
    }