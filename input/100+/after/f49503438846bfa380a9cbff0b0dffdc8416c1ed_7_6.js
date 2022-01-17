function createFunction(methodInfo, scope) {
    const mi = methodInfo;
    assert(!mi.isNative(), "Method should have a builtin: ", mi.name);

    function closeOverScope(fn, scope) {
      var closure = function () {
        Array.prototype.unshift.call(arguments, scope);
        var global = (this === jsGlobal ? scope.global.object : this);
        return fn.apply(global, arguments);
      };
      closure.instance = closure;
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
      return fn;
    }

    const mode = this.domain.mode;

    /**
     * We use not having an analysis to mean "not initialized".
     */
    if (!mi.analysis) {
      mi.analysis = new Analysis(mi, { massage: true });
      if (mi.traits) {
        mi.activationPrototype = this.applyTraits({}, null, null, mi.traits, null, false);
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
  }