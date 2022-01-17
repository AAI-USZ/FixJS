function(properties) {
      var at;
      at = this.namespaced ? Luca.util.resolve(this.namespace, window || global) : window || global;
      if (this.namespaced && !(at != null)) {
        eval("(window||global)." + this.namespace + " = {}");
        at = Luca.util.resolve(this.namespace, window || global);
      }
      at[this.componentId] = Luca.extend(this.superClassName, this.componentName, properties);
      if (Luca.autoRegister === true && Luca.isViewPrototype(at[this.componentId])) {
        Luca.register(_.string.underscored(this.componentId), this.componentName);
      }
      return at[this.componentId];
    }