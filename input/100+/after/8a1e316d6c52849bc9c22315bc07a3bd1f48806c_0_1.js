function(properties) {
      var at, componentType;
      at = this.namespaced ? Luca.util.resolve(this.namespace, window || global) : window || global;
      if (this.namespaced && !(at != null)) {
        eval("(window||global)." + this.namespace + " = {}");
        at = Luca.util.resolve(this.namespace, window || global);
      }
      at[this.componentId] = Luca.extend(this.superClassName, this.componentName, properties);
      if (Luca.autoRegister === true) {
        if (Luca.isViewPrototype(at[this.componentId])) componentType = "view";
        if (Luca.isCollectionPrototype(at[this.componentId])) {
          componentType = "collection";
        }
        if (Luca.isModelPrototype(at[this.componentId])) componentType = "model";
        Luca.register(_.string.underscored(this.componentId), this.componentName, componentType);
      }
      return at[this.componentId];
    }