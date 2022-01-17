function() {
      var oldConfig = mulberry.app.Config.get('app');

      mulberry.app.Config.set('app', dojo.mixin(oldConfig, { ads : {
        phone : 'phone',
        tablet : 'tablet'
      } }));

      toura.features.siblingNav = true;
      toura.features.ads = true;

      var spy = spyOn(mulberry.app.UI, 'addPersistentComponent').andCallThrough();

      ui = createUI();

      expect(ui.siblingNav).not.toBeDefined();
      expect(spy).not.toHaveBeenCalled();

      mulberry.app.Config.set('app', oldConfig);
    }