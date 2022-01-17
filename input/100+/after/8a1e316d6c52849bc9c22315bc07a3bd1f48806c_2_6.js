function() {

  _.def('Luca.Application')["extends"]('Luca.containers.Viewport')["with"]({
    autoBoot: false,
    name: "MyApp",
    autoStartHistory: true,
    useCollectionManager: true,
    collectionManagerClass: "Luca.CollectionManager",
    plugin: false,
    useController: true,
    components: [
      {
        ctype: 'template',
        name: 'welcome',
        template: 'sample/welcome',
        templateContainer: "Luca.templates"
      }
    ],
    initialize: function(options) {
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
    },
    activeView: function() {
      var active;
      if (active = this.activeSubSection()) {
        return this.view(active);
      } else {
        return this.view(this.activeSection());
      }
    },
    activeSubSection: function() {
      return this.get("active_sub_section");
    },
    activeSection: function() {
      return this.get("active_section");
    },
    afterComponents: function() {
      var _ref, _ref2, _ref3,
        _this = this;
      if ((_ref = Luca.containers.Viewport.prototype.afterComponents) != null) {
        _ref.apply(this, arguments);
      }
      if ((_ref2 = this.getMainController()) != null) {
        _ref2.bind("after:card:switch", function(previous, current) {
          return _this.state.set({
            active_section: current.name
          });
        });
      }
      return (_ref3 = this.getMainController()) != null ? _ref3.each(function(component) {
        if (component.ctype.match(/controller$/)) {
          return component.bind("after:card:switch", function(previous, current) {
            return _this.state.set({
              active_sub_section: current.name
            });
          });
        }
      }) : void 0;
    },
    boot: function() {
      return this.trigger("ready");
    },
    collection: function() {
      return this.collectionManager.getOrCreate.apply(this.collectionManager, arguments);
    },
    get: function(attribute) {
      return this.state.get(attribute);
    },
    getMainController: function() {
      if (this.useController === true) return this.components[0];
      return Luca.cache('main_controller');
    },
    set: function(attributes) {
      return this.state.set(attributes);
    },
    view: function(name) {
      return Luca.cache(name);
    },
    navigate_to: function(component_name, callback) {
      return this.getMainController().navigate_to(component_name, callback);
    },
    setupKeyRouter: function() {
      var router, _base;
      if (!this.keyEvents) return;
      (_base = this.keyEvents).control_meta || (_base.control_meta = {});
      if (this.keyEvents.meta_control) {
        _.extend(this.keyEvents.control_meta, this.keyEvents.meta_control);
      }
      router = _.bind(this.keyRouter, this);
      return $(document).keydown(router);
    },
    keyRouter: function(e) {
      var control, isInputEvent, keyEvent, keyname, meta, source, _ref;
      if (!(e && this.keyEvents)) return;
      isInputEvent = $(e.target).is('input') || $(e.target).is('textarea');
      if (isInputEvent) return;
      keyname = Luca.keyMap[e.keyCode];
      if (!keyname) return;
      meta = (e != null ? e.metaKey : void 0) === true;
      control = (e != null ? e.ctrlKey : void 0) === true;
      source = this.keyEvents;
      source = meta ? this.keyEvents.meta : source;
      source = control ? this.keyEvents.control : source;
      source = meta && control ? this.keyEvents.meta_control : source;
      if (keyEvent = source != null ? source[keyname] : void 0) {
        if (this[keyEvent] != null) {
          return (_ref = this[keyEvent]) != null ? _ref.call(this) : void 0;
        } else {
          return this.trigger(keyEvent);
        }
      }
    }
  });

}