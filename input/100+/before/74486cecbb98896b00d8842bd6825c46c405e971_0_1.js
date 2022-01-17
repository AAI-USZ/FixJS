function () {
      initializing = true;
      var prototype = new this();
      initializing = false;

      mix.apply(null, Espresso.A(arguments)).into(prototype);

      function Class() {
        Espresso.init(this);
        if (!initializing && Espresso.isCallable(this.init)) {
          this.init.apply(this, arguments);
        }
      }

      Class.prototype = prototype;
      Class.constructor = Class;
      Class.extend = arguments.callee;
      return Class;
    }