function initializeGlobalObject(global) {
  const PUBLIC_MANGLED = /^public\$/;
  function publicKeys(obj) {
    var keys = [];
    for (var key in obj) {
      if (PUBLIC_MANGLED.test(key) &&
          !(obj.bindings && obj.bindings.indexOf(key) >= 0)) {
        keys.push(key.substr(7));
      }
    }
    return keys;
  }

  /**
   * Gets the next name index of an object. Index |zero| is actually not an
   * index, but rather an indicator to start the iteration.
   */
  defineReadOnlyProperty(global.Object.prototype, "nextNameIndex", function (index) {
    if (index === 0) {
      /*
       * We're starting a new iteration. Hope that _publicKeys haven't been
       * defined already.
       */
      this._publicKeys = publicKeys(this);
    }
    if (index < this._publicKeys.length) {
      return index + 1;
    }
    delete this._publicKeys;
    return 0;
  });

  /**
   * Gets the nextName after the specified |index|, which you would expect to
   * be index + 1, but it's actually index - 1;
   */
  defineReadOnlyProperty(global.Object.prototype, "nextName", function (index) {
    var keys = this._publicKeys;
    assert (keys && index > 0 && index < keys.length + 1);
    return keys[index - 1];
  });

  /**
   * To get |toString| and |valueOf| to work transparently, as in without
   * reimplementing stuff like trace and +.
   */
  for (var i = 0, j = originals.length; i < j; i++) {
    var object = originals[i].object;
    originals[i].overrides.forEach(function (originalFunctionName) {
      var originalFunction = object.prototype[originalFunctionName];
      var overrideFunctionName = "public$" + originalFunctionName;
      global[object.name].prototype[originalFunctionName] = function () {
        if (this[overrideFunctionName]) {
          return this[overrideFunctionName]();
        }
        return originalFunction.call(this);
      };
    });
  }
}