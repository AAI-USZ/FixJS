function(options) {
      var definedComponents, _base,
        _this = this;
      this.options = options != null ? options : {};
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
        this.collectionManager || (this.collectionManager = typeof (_base = Luca.CollectionManager).get === "function" ? _base.get() : void 0);
        this.collectionManager || (this.collectionManager = new this.collectionManagerClass(this.collectionManagerOptions || (this.collectionManagerOptions = {})));
      }
      this.state = new Luca.Model(this.defaultState);
      this.defer(function() {
        return _this.render();
      }).until("ready");
      if (this.useKeyRouter === true && (this.keyEvents != null)) {
        this.setupKeyRouter();
      }
      if (this.plugin !== true) {
        return Luca.getApplication = function() {
          return _this;
        };
      }
    }