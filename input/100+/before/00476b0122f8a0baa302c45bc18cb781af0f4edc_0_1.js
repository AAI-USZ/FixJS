function extend(klass, instance, override, methods) {
    var extendee = instance ? klass.prototype : klass, original;
    initializeClass(klass, instance, methods);
    iterateOverObject(methods, function(name, method) {
      original = extendee[name];
      if(typeof override === 'function') {
        method = wrapNative(extendee[name], method, override);
      }
      if(override !== false || !extendee[name]) {
        defineProperty(extendee, name, method);
      }
      // If the method is internal to Sugar, then store a reference so it can be restored later.
      klass['SugarMethods'][name] = { instance: instance, method: method, original: original };
    });
  }