function() {
      var called = false;
      var model = new Backbone.Model();
      spyOn(view, 'test_method');
      model.bind('change', view.test_method, view);
      model.bind('change', function() { called= true;});
      view.add_related_model(model);

      model.trigger('change');
      expect(called).toEqual(true);
      expect(view.test_method).toHaveBeenCalled();
      expect(view.test_method.callCount).toEqual(1);
      called = false;
      view.clean();
      expect(_.size(view._models)).toEqual(0);
      //trigger again
      model.trigger('change');
      expect(called).toEqual(true);
      expect(view.test_method.callCount).toEqual(1);
  }