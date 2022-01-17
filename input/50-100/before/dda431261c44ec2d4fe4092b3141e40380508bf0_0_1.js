function C(args) {
      if (!(this instanceof C)) return new C(arguments);
      if (args && isFunction(obj.init)) obj.init.apply(obj, args);
    }