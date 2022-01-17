function Domain(base, mode, allowNatives) {
    // ABCs that belong to this domain.
    this.abcs = [];

    // Classes that have been loaded.
    this.loadedClasses = [];

    // Classes cache.
    this.cache = {};

    // Our parent.
    this.base = base;

    // Do we allow natives?
    this.allowNatives = allowNatives;

    // Do we compile or interpret?
    this.mode = mode;

    // If we are the system domain (the root), we should initialize the Class
    // and MethodClosure classes.
    if (base) {
      this.system = base.system;
    } else {
      this.system = this;

      var Class = this.Class = function Class(name, instance, callable) {
        this.debugName = name;

        if (instance) {
          assert(instance.prototype);
          this.instance = instance;
        }

        if (!callable) {
          callable = Domain.passthroughCallable(instance);
        }
        defineNonEnumerableProperty(this, "call", callable.call);
        defineNonEnumerableProperty(this, "apply", callable.apply);
      };

      Class.prototype = {
        extendBuiltin: function(baseClass) {
          // Some natives handle their own prototypes/it's impossible to do the
          // traits/public prototype BS, e.g. Object, Array, etc.
          // FIXME: This is technically non-semantics preserving.
          this.baseClass = baseClass;
          this.dynamicPrototype = this.instance.prototype;
          defineNonEnumerableProperty(this.dynamicPrototype, "public$constructor", this);
        },

        extend: function (baseClass) {
          this.baseClass = baseClass;
          this.dynamicPrototype = Object.create(baseClass.dynamicPrototype);
          this.instance.prototype = Object.create(this.dynamicPrototype);
          defineNonEnumerableProperty(this.dynamicPrototype, "public$constructor", this);
        },

        isInstance: function (value) {
          if (value === null || typeof value !== "object") {
            return false;
          }
          return this.dynamicPrototype.isPrototypeOf(value);
        },

        toString: function () {
          return "[class " + this.debugName + "]";
        }
      };

      Class.instance = Class;
      Class.toString = Class.prototype.toString;

      // Traits are below the dynamic instant prototypes,
      // i.e. this.dynamicPrototype === Object.getPrototypeOf(this.instance.prototype)
      // and we cache the dynamic instant prototype as this.dynamicPrototype.
      //
      // Traits are not visible to the AVM script.
      Class.nativeMethods = {
        "get prototype": function () {
          return this.dynamicPrototype;
        }
      };

      var MethodClosure = this.MethodClosure = function MethodClosure($this, fn) {
        var bound = fn.bind($this);
        defineNonEnumerableProperty(this, "call", bound.call.bind(bound));
        defineNonEnumerableProperty(this, "apply", bound.apply.bind(bound));
      };

      MethodClosure.prototype = {
        toString: function () {
          return "function Function() {}";
        }
      };
    }
  }