function() {
      var called = false;
      var model = new Backbone.Model();
      model.bind('change', view.test_method, this);
      model.bind('change', function() { called= true;});
      view.add_related_model(model);
      expect(model._callbacks.change.tail).not.toEqual(model._callbacks.change.next);

      model.trigger('change');
      expect(called).toEqual(true);
      called = false;
      view.clean();
      model.trigger('change');
      expect(called).toEqual(true);
      // there is only one event
      expect(model._callbacks.change.tail).toEqual(model._callbacks.change.next);
  }