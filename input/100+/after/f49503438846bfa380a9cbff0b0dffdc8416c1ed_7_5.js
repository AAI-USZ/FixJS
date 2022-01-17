function createClass(classInfo, baseClass, scope) {
    var ci = classInfo;
    var ii = ci.instanceInfo;

    if (ii.isInterface()) {
      return this.createInterface(classInfo);
    }

    const domain = this.domain;

    var className = ii.name.getName();
    if (traceExecution.value) {
      print("Creating class " + className  + (ci.native ? " replaced with native " + ci.native.cls : ""));
    }

    // Make the class and apply traits.
    //
    // User-defined classes should always have a base class, so we can save on
    // a few conditionals.
    var cls, instance;
    var baseBindings = baseClass ? baseClass.instance.prototype : null;

    if (ci.native) {
      // Some natives classes need this, like Error.
      var makeNativeClass = getNative(ci.native.cls);
      assert(makeNativeClass, "No native for ", ci.native.cls);

      // Special case Object, which has no base class but needs the Class class on the scope.
      if (!baseClass) {
        scope = new Scope(scope, domain.system.Class);
      }
      scope = new Scope(scope, null);

      cls = makeNativeClass(this, scope, this.createFunction(ii.init, scope), baseClass);

      if ((instance = cls.instance)) {
        // Instance traits live on instance.prototype.
        this.applyTraits(instance.prototype, scope, baseBindings, ii.traits, cls.nativeMethods, true);
      }
      this.applyTraits(cls, scope, null, ci.traits, cls.nativeStatics, false);
    } else {
      scope = new Scope(scope, null);
      instance = this.createFunction(ii.init, scope);
      cls = new domain.system.Class(className, instance);
      cls.extend(baseClass);
      this.applyTraits(instance.prototype, scope, baseBindings, ii.traits, null, true);
      this.applyTraits(cls, scope, null, ci.traits, null, false);
    }
    scope.object = cls;

    if (ii.interfaces.length > 0) {
      cls.implementedInterfaces = [];
    }

    // Apply interface traits recursively.
    //
    // interface IA {
    //   function foo();
    // }
    //
    // interface IB implements IA {
    //   function bar();
    // }
    //
    // class C implements IB {
    //   function foo() { ... }
    //   function bar() { ... }
    // }
    //
    // var a:IA = new C();
    // a.foo(); // callprop IA$foo
    //
    // var b:IB = new C();
    // b.foo(); // callprop IB:foo
    // b.bar(); // callprop IB:bar
    //
    // So, class C must have bindings for:
    //
    // IA$foo -> public$foo
    // IB$foo -> public$foo
    // IB$bar -> public$bar
    //
    // Luckily, interface methods are always public.
    (function applyInterfaceTraits(interfaces) {
      for (var i = 0, j = interfaces.length; i < j; i++) {
        var iface = domain.getProperty(interfaces[i], true, true);
        var ii = iface.classInfo.instanceInfo;
        cls.implementedInterfaces.push(iface);
        applyInterfaceTraits(ii.interfaces);

        var bindings = instance.prototype;
        var iftraits = ii.traits;
        for (var i = 0, j = iftraits.length; i < j; i++) {
          var iftrait = iftraits[i];
          var ifqn = trait.name.getQualifiedName();
          var ptrait = Object.getOwnProperty(bindings, "public$" + iftrait.name.getName());
          Object.defineProperty(bindings, qn, ptrait);
        }
      }
    })(ii.interfaces);

    // Run the static initializer.
    this.createFunction(classInfo.init, scope).call(cls);

    // Hang on to stuff we need.
    cls.scope = scope;
    cls.classInfo = classInfo;

    if (traceClasses.value) {
      domain.loadedClasses.push(cls);
      domain.traceLoadedClasses();
    }

    return cls;
  }