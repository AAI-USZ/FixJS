function() {

    Milk.mixin = function() {
      var key, object, objects, target, value, _i, _len;
      target = arguments[0], objects = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      for (_i = 0, _len = objects.length; _i < _len; _i++) {
        object = objects[_i];
        for (key in object) {
          value = object[key];
          target[key] = value;
        }
      }
      return target;
    };

    Milk.prototype.mixin = function() {
      var objects;
      objects = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return Milk.mixin.apply(Milk, [this].concat(__slice.call(objects)));
    };

    function Milk() {
      var component, components, key, value, _i, _len, _ref;
      components = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this.scene = game.scene;
      for (_i = 0, _len = components.length; _i < _len; _i++) {
        component = components[_i];
        if (component != null ? component.isMilkComponent : void 0) {
          this.components || (this.components = []);
          this.components.push(component);
          _ref = component.prototype;
          for (key in _ref) {
            value = _ref[key];
            if (!(this[key] != null)) {
              this[key] = value;
            }
          }
          component.call(this);
        }
      }
    }

    Milk.prototype.componentDispatch = function(operationName, args) {
      var component, _i, _len, _ref, _ref1;
      if (this.components) {
        _ref = this.components;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          component = _ref[_i];
          if ((_ref1 = component.prototype[operationName]) != null) {
            _ref1.apply(this, args);
          }
        }
      }
      return null;
    };

    Milk.prototype.stage = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.componentDispatch('stage', args);
    };

    Milk.prototype.render = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.componentDispatch('render', args);
    };

    Milk.prototype.update = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.componentDispatch('update', args);
    };

    Milk.prototype.exportObject = function(object3D) {
      this.object3D = object3D;
      return this.componentDispatch('exportObject', [object3D]);
    };

    Milk.prototype.notReady = function() {
      var className, l, _base;
      this._ready = false;
      if (game.hasLoaded) {
        return;
      }
      className = this.constructor.name;
      Milk.loadingStates || (Milk.loadingStates = {});
      (_base = Milk.loadingStates)[className] || (_base[className] = 0);
      Milk.loadingStates[className] += 1;
      console.log('LOADING', className);
      if (l = $('#chat-log')) {
        return l.append("<li>Loading " + className + "</li>");
      }
    };

    Milk.prototype.ready = function() {
      var className, l;
      this._ready = true;
      if (typeof this.onready === "function") {
        this.onready();
      }
      if (game.hasLoaded) {
        return;
      }
      className = this.constructor.name;
      Milk.loadingStates[className] -= 1;
      console.log('DONE', className);
      if (l = $('#chat-log')) {
        l.append("<li>Done " + className + "</li>");
      }
      if (this.isReady()) {
        return game.ready();
      }
    };

    Milk.prototype.isReady = function() {
      var count, state, _ref;
      if (!game.isReady) {
        return false;
      }
      _ref = Milk.loadingStates;
      for (state in _ref) {
        count = _ref[state];
        if (count > 0) {
          return false;
        }
      }
      return true;
    };

    Milk.prototype.afterReady = function(callback) {
      this.onready = callback;
      if (this._ready) {
        return typeof this.onready === "function" ? this.onready() : void 0;
      }
    };

    Milk.prototype.observe = function(eventName, callback) {
      var c, _base;
      this._observers || (this._observers = {});
      c = (_base = this._observers)[eventName] || (_base[eventName] = []);
      if (c.indexOf(callback) === -1) {
        c.push(callback);
      }
      return this;
    };

    Milk.prototype.fire = function(eventName, data) {
      var c, callback, _i, _len;
      c = this._observers[eventName];
      if (c) {
        for (_i = 0, _len = c.length; _i < _len; _i++) {
          callback = c[_i];
          callback(data);
        }
      }
      return this;
    };

    return Milk;

  }