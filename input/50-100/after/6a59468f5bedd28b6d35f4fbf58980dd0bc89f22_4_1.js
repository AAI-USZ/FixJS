function() {
      var view, viewController;
      view = Ext.create('Ext.Container');
      viewController = Ext.create('Deft.mvc.ViewController');
      expect(viewController.getView()).toBe(null);
      viewController.controlView(view);
      return expect(viewController.getView()).toBe(view);
    }