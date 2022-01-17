function () {
  var functionCount = 0;

  function runtime(abc) {
    this.abc = abc;
    this.domain = abc.domain;
    this.compiler = new Compiler(abc);
    this.interpreter = new Interpreter(abc);

    /**
     * All runtime exceptions are boxed in this object to tag them as having
     * originated from within the VM.
     */
    this.exception = { value: undefined };
  }

  // We sometimes need to know where we came from, such as in
  // |ApplicationDomain.currentDomain|.
  runtime.stack = [];

  runtime.prototype.pushCurrent = function () {
    runtime.currentSaves.push(runtime.current);
    runtime.current = this;
  };

  runtime.prototype.popCurrent = function () {
    runtime.current = runtime.currentSaves.pop();
  };

  runtime.prototype.createActivation = function (method) {
    return Object.create(method.activationPrototype);
  };

  runtime.prototype.createFunction = function (methodInfo, scope) {
    const mi = methodInfo;
    assert(!mi.isNative(), "Method should have a builtin: ", mi.name);

    function closeOverScope(fn, scope) {
      var closure = function () {
        Array.prototype.unshift.call(arguments, scope);
        var global = (this === jsGlobal ? scope.global.object : this);
        return fn.apply(global, arguments);
      };
      closure.instance = closure;
      defineNonEnumerableProperty(closure.prototype, "public$constructor", closure);
      return closure;
    }

    var hasDefaults = false;
    const defaults = mi.parameters.map(function (p) {
      if (p.value) {
        hasDefaults = true;
      }
      return p.value;
    });

    function interpretedMethod(interpreter, methodInfo, scope) {
      var fn = function () {
        var global = (this === jsGlobal ? scope.global.object : this);
        var args;
        if (hasDefaults && arguments.length < defaults.length) {
          args = Array.prototype.slice.call(arguments);
          args = args.concat(defaults.slice(arguments.length - defaults.length));
        } else {
          args = arguments;
        }
        return interpreter.interpretMethod(global, methodInfo, scope, args);
      };
      fn.instance = fn;
      defineNonEnumerableProperty(fn.prototype, "public$constructor", fn);
      return fn;
    }

    const mode = this.domain.mode;

    /**
     * We use not having an analysis to mean "not initialized".
     */
    if (!mi.analysis) {
      mi.analysis = new Analysis(mi, { massage: true });
      if (mi.traits) {
        mi.activationPrototype = this.applyTraits({}, mi.traits);
      }
    }

    if (mode === ALWAYS_INTERPRET) {
      return interpretedMethod(this.interpreter, mi, scope);
    }

    if (mi.compiledMethod) {
      return closeOverScope(mi.compiledMethod, scope);
    }

    if (!mi.analysis.restructureControlFlow()) {
      return interpretedMethod(this.interpreter, mi, scope);
    }

    var body = this.compiler.compileMethod(mi, hasDefaults, scope);

    var parameters = mi.parameters.map(function (p) {
      return p.name;
    });
    parameters.unshift(SAVED_SCOPE_NAME);

    var fnName = mi.name ? mi.name.getQualifiedName() : "fn" + functionCount;
    var fnSource = "function " + fnName + " (" + parameters.join(", ") + ") " + body;
    if (traceLevel.value > 0) {
      print (fnSource);
    }
    if (true) { // Use |false| to avoid eval(), which is only useful for stack traces.
      mi.compiledMethod = eval('[' + fnSource + '][0]');
    } else {
      mi.compiledMethod = new Function(parameters, body);
    }
    functionCount++;
    return closeOverScope(mi.compiledMethod, scope);
  };

  /**
   * ActionScript Classes are modeled as constructor functions (class objects) which hold additional properties:
   *
   * [scope]: a scope object holding the current class object
   *
   * [baseClass]: a reference to the base class object
   *
   * [instanceTraits]: an accumulated set of traits that are to be applied to instances of this class
   *
   * [prototype]: the prototype object of this constructor function  is populated with the set of instance traits,
   *   when instances are of this class are created, their __proto__ is set to this object thus inheriting this
   *   default set of properties.
   *
   * [construct]: a reference to the class object itself, this is used when invoking the constructor with an already
   *   constructed object (i.e. constructsuper)
   *
   * additionally, the class object also has a set of class traits applied to it which are visible via scope lookups.
   */
  runtime.prototype.createClass = function createClass(classInfo, baseClass, scope) {
    var ci = classInfo;
    var ii = ci.instanceInfo;

    if (ii.isInterface()) {
      return this.createInterface(classInfo);
    }

    const domain = this.domain;
    scope = new Scope(scope, null);

    var className = ii.name.getName();
    if (traceExecution.value) {
      print("Creating class " + className  + (ci.native ? " replaced with native " + ci.native.cls : ""));
    }

    /**
     * Make the class and apply traits.
     *
     * User-defined classes should always have a base class, so we can save on
     * a few conditionals.
     */
    var cls, instance;
    var bii = baseClass ? baseClass.classInfo.instanceInfo : null;
    if (ci.native) {
      /* Some natives classes need this, like Error. */
      var makeNativeClass = getNative(ci.native.cls);
      assert (makeNativeClass, "No native for ", ci.native.cls);
      cls = makeNativeClass(this, scope, this.createFunction(ii.init, scope), baseClass);
      if ((instance = cls.instance)) {
        /* Math doesn't have an instance, for example. */
        this.applyTraits(cls.instance.prototype, ii.traits, bii ? bii.traits : null, scope, cls.nativeMethods);
      }
      this.applyTraits(cls, ci.traits, null, scope, cls.nativeStatics);
    } else {
      instance = this.createFunction(ii.init, scope);
      cls = new Class(className, instance);
      cls.extend(baseClass);
      this.applyTraits(instance.prototype, ii.traits, bii.traits, scope);
      this.applyTraits(cls, ci.traits, null, scope);
    }
    scope.object = cls;

    /**
     * Apply interface traits recursively, creating getters for interface names. For instance:
     *
     * interface IA {
     *   function foo();
     * }
     *
     * interface IB implements IA {
     *   function bar();
     * }
     *
     * class C implements IB {
     *   function foo() { ... }
     *   function bar() { ... }
     * }
     *
     * var a:IA = new C();
     * a.foo(); // callprop IA$foo
     *
     * var b:IB = new C();
     * b.foo(); // callprop IB:foo
     * b.bar(); // callprop IB:bar
     *
     * So, class C must have getters for:
     *
     * IA$foo -> public$foo
     * IB$foo -> public$foo
     * IB$bar -> public$bar
     *
     * Luckily, interface methods are always public.
     */
    if (ii.interfaces.length > 0) {
      cls.implementedInterfaces = [];
    }
    (function applyInterfaceTraits(interfaces) {
      for (var i = 0, j = interfaces.length; i < j; i++) {
        var iname = interfaces[i];
        var iface = domain.getProperty(iname, true, true);
        var ci = iface.classInfo;
        var ii = ci.instanceInfo;
        cls.implementedInterfaces.push(iface);
        applyInterfaceTraits(ii.interfaces);
        ii.traits.traits.forEach(function (trait) {
          var name = "public$" + trait.name.getName();
          if (trait.isGetter() || trait.isSetter()) {
            var proto = instance.prototype;
            var qn = trait.name.getQualifiedName();
            var descriptor = Object.getOwnPropertyDescriptor(proto, name);
            if (trait.isGetter()) {
              defineGetter(proto, qn, descriptor.get);
            } else {
              defineSetter(proto, qn, descriptor.set);
            }
          } else {
            Object.defineProperty(instance.prototype, trait.name.getQualifiedName(), {
              get: function () { return this[name]; },
              enumerable: false
            });
          }
        });
      }
    })(ii.interfaces);

    /* Call the static constructor. */
    this.createFunction(classInfo.init, scope).call(cls);

    /**
     * Hang on to stuff we need.
     */
    cls.scope = scope;
    cls.classInfo = classInfo;

    if (traceClasses.value) {
      domain.loadedClasses.push(cls);
      domain.traceLoadedClasses();
    }

    return cls;
  };

  runtime.prototype.createInterface = function createInterface(classInfo) {
    var ii = classInfo.instanceInfo;
    assert (ii.isInterface());
    if (traceExecution.value) {
      var str = "Creating interface " + ii.name;
      if (ii.interfaces.length) {
        str += " implements " + ii.interfaces.map(function (name) {
          return name.getName();
        }).join(", ");
      }
      print(str);
    }
    return new Interface(classInfo);
  };

  /**
   * Apply a set of traits to an object. Slotted traits may alias named properties, thus for
   * every slotted trait we create two properties: one to hold the actual value, one to hold
   * a getter/setter that reads the actual value. For instance, for the slot trait "7:Age" we
   * generated three properties: "S7" to hold the actual value, and an "Age" getter/setter pair
   * that mutate the "S7" property. The invariant we want to maintain is [obj.S7 === obj.Age].
   *
   * This means that there are two ways to get to any slotted trait, a fast way and a slow way.
   * I guess we should profile and find out which type of access is more common (by slotId or
   * by name).
   *
   * Moreover, traits may be typed which means that type coercion must happen whenever values
   * are stored in traints. To do this, we introduce yet another level of indirection. In the
   * above example, if "Age" is of type "int" then we store the real value in the property "$S7",
   * and use a setter in the property "S7" to do the type coercion.
   *
   * The |scope| must be passed in if the traits include method traits, which have to be bound to
   * a scope.
   */
  runtime.prototype.applyTraits = function applyTraits(obj, traits, baseTraits, scope, classNatives) {
    function computeAndVerifySlotIds(traits, base) {
      assert(!base || base.verified);

      var baseSlotId = base ? base.lastSlotId : 0;
      var freshSlotId = baseSlotId;

      var ts = traits.traits;
      for (var i = 0, j = ts.length; i < j; i++) {
        var trait = ts[i];
        if (trait.isSlot() || trait.isConst() || trait.isClass()) {
          if (!trait.slotId) {
            trait.slotId = ++freshSlotId;
          }

          if (trait.slotId <= baseSlotId) {
            /* XXX: Hope we don't throw while doing builtins. */
            this.throwErrorFromVM("VerifyError", "Bad slot ID.");
          }
        }
      }

      traits.verified = true;
      traits.lastSlotId = freshSlotId;
    }

    function defineProperty(name, slotId, value, type, readOnly) {
      if (slotId) {
        if (readOnly) {
          defineReadOnlyProperty(obj, name, value);
        } else {
          defineNonEnumerableProperty(obj, name, value);
        }
        obj.slots[slotId] = name;
        obj.types[name] = type;
      } else if (!obj.hasOwnProperty(name)) {
        defineNonEnumerableProperty(obj, name, value);
      }
    }

    if (!traits.verified) {
      computeAndVerifySlotIds(traits, baseTraits);
    }

    const domain = this.domain;
    var ts = traits.traits;

    // Make a slot # -> property id and property id -> type mappings. We use 2
    // maps instead of 1 map of an object to avoid an extra property lookup on
    // getslot, since we only coerce on assignment.
    defineNonEnumerableProperty(obj, "slots", new Array(ts.length));
    defineNonEnumerableProperty(obj, "types", {});

    for (var i = 0, j = ts.length; i < j; i++) {
      var trait = ts[i];
      var qn = trait.name.getQualifiedName();

      assert (trait.holder);
      if (trait.isSlot() || trait.isConst()) {
        var type = trait.typeName ? domain.getProperty(trait.typeName, false, false) : null;
        defineProperty(qn, trait.slotId, trait.value, type, trait.isConst());
      } else if (trait.isMethod() || trait.isGetter() || trait.isSetter()) {
        assert (scope !== undefined);
        var mi = trait.methodInfo;
        var closure = null;
        if (mi.isNative() && domain.allowNatives) {
          /**
           * We can get the native metadata from two places: either a [native]
           * metadata directly attached to the method trait, or from a
           * [native] metadata attached to the encompassing class.
           *
           * XXX: I'm choosing for the per-method [native] to override
           * [native] on the class if both are present.
           */
          var md = trait.metadata;
          if (md && md.native) {
            var makeClosure = getNative(md.native.items[0].value);
            closure = makeClosure && makeClosure(this, scope);
          } else if (md && md.unsafeJSNative) {
            closure = getNative(md.unsafeJSNative.items[0].value);
          } else if (classNatives) {
            /**
             * At this point the native class already had the scope, so we
             * don't need to close over the method again.
             */
            var k = mi.name.getName();
            if (trait.isGetter()) {
              k = "get " + k;
            } else if (trait.isSetter()) {
              k = "set " + k;
            }
            closure = classNatives[k];
          }
        } else {
          closure = this.createFunction(mi, scope);
        }

        if (!closure) {
          closure = (function (mi) {
            return function() {
              print("Calling undefined native method: " + mi.name.getQualifiedName());
            };
          })(mi);
        }

        /* Identify this as a method for auto-binding via MethodClosure. */
        defineNonEnumerableProperty(closure, "isMethod", true);

        if (trait.isGetter()) {
          defineGetter(obj, qn, closure);
        } else if (trait.isSetter()) {
          defineSetter(obj, qn, closure);
        } else {
          defineReadOnlyProperty(obj, qn, closure);
        }
      } else if (trait.isClass()) {
        // Builtins are special, so drop any attempts to define builtins
        // that aren't from 'builtin.abc'.
        var res = domain.findDefiningScript(trait.name, false);
        if (res) {
          var abc = res.script.abc;
          if (!abc.domain.base && abc.name === "builtin.abc") {
            return obj;
          }
        }

        if (trait.metadata && trait.metadata.native && domain.allowNatives) {
          trait.classInfo.native = trait.metadata.native;
        }
        defineProperty(qn, trait.slotId, null, undefined, false);
      } else {
        assert(false, trait);
      }
    }

    return obj;
  };

  runtime.prototype.applyType = function applyType(factory, types) {
    var factoryClassName = factory.classInfo.instanceInfo.name.name;
    if (factoryClassName === "Vector") {
      assert (types.length === 1);
      var typeClassName = types[0].classInfo.instanceInfo.name.name;
      switch (typeClassName) {
      case "int":
      case "uint":
      case "double":
        break;
      default:
        typeClassName = "object";
        break;
      }
      return this.domain.getClass("packageInternal __AS3__$vec.Vector$" + typeClassName);
    } else {
      return notImplemented(factoryClassName);
    }
  };

  throwErrorFromVM: function throwErrorFromVM(errorClass, message) {
    throw new (this.domain.getClass(errorClass)).instance(message);
  };

  translateError: function translateError(error) {
    if (error instanceof Error) {
      var type = this.domain.getClass(error.name);
      if (type) {
        return new type.instance(error.message);
      }
      unexpected("Can't translate error: " + error);
    }
    return error;
  };

  return runtime;
}