function createClass(classInfo, baseClass, scope) {
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
  }