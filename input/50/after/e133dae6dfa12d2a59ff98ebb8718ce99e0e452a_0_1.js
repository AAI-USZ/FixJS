function() {
      var controller = Jax.Controller.create({
        helpers: [helper]
      });
      expect(new controller().test_method).toEqual(helper.test_method);
    }