function(options) {
      var alreadyRunning, app, appName, definedComponents, routerClass, _base, _base2,
        _this = this;
      this.options = options != null ? options : {};
      app = this;
      appName = this.name;
      alreadyRunning = typeof Luca.getApplication === "function" ? Luca.getApplication() : void 0;
      (_base = Luca.Application).instances || (_base.instances = {});
      Luca.Application.instances[appName] = app;
      Luca.containers.Viewport.prototype.initialize.apply(this, arguments);
      if (this.useController === true) definedComponents = this.components || [];
      this.components = [
        {
          ctype: 'controller',
          name: "main_controller",
          components: definedComponents
        }
      ];
      if (this.useCollectionManager === true) {
        if (_.isString(this.collectionManagerClass)) {
          this.collectionManagerClass = Luca.util.resolve(this.collectionManagerClass);
        }
        this.collectionManager || (this.collectionManager = typeof (_base2 = Luca.CollectionManager).get === "function" ? _base2.get() : void 0);
        this.collectionManager || (this.collectionManager = new this.collectionManagerClass(this.collectionManagerOptions || (this.collectionManagerOptions = {})));
      }
      this.state = new Luca.Model(this.defaultState);
      this.defer(function() {
        return app.render();
      }).until(this, "ready");
      if (this.useKeyRouter === true && (this.keyEvents != null)) {
        this.setupKeyRouter();
      }
      if (_.isString(this.router)) {
        routerClass = Luca.util.resolve(this.router);
        this.router = new routerClass({
          app: app
        });
      }
      if (this.router && this.autoStartHistory) {
        this.defer(function() {
          return Backbone.history.start();
        }).until(this, this.startHistoryOn || "after:render");
      }
      if (!(this.plugin === true || alreadyRunning)) {
        Luca.getApplication = function(name) {
          if (name == null) return app;
          return Luca.Application.instances[name];
        };
      }
      if (this.autoBoot) {
        if (Luca.util.resolve(this.name)) {
          throw "Attempting to override window." + this.name + " when it already exists";
        }
        return $(function() {
          window[appName] = app;
          return app.boot();
        });
      }
    }