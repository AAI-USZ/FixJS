function() {
      var controller = Jax.Controller.create({});
      expect(new controller().test_method).toBeUndefined();
    }