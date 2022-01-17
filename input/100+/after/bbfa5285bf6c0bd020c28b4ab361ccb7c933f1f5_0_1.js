function makeMutableProtoPatcher(constr, classString) {
    var proto = constr.prototype;
    var baseToString = objToString.call(proto);
    if (baseToString !== '[object ' + classString + ']') {
      throw new TypeError('unexpected: ' + baseToString);
    }
    var grandProto = getPrototypeOf(proto);
    var grandBaseToString = objToString.call(grandProto);
    if (grandBaseToString === '[object ' + classString + ']') {
      throw new TypeError('malformed inheritance: ' + classString);
    }
    if (grandProto !== Object.prototype) {
      logger.log('unexpected inheritance: ' + classString);
    }
    function mutableProtoPatcher(name) {
      if (!hop.call(proto, name)) { return; }
      var originalMethod = proto[name];
      function replacement(var_args) {
        var parent = getPrototypeOf(this);
        if (parent !== proto) {
          // In the typical case, parent === proto, so the above test
          // lets the typical case succeed quickly.
          // Note that, even if parent === proto, that does not
          // necessarily mean that the method application will
          // succeed, since, for example, a non-Date can still inherit
          // from Date.prototype. However, in such cases, the built-in
          // method application will fail on its own without our help.
          if (objToString.call(parent) !== baseToString) {
            // As above, === baseToString does not necessarily mean
            // success, but the built-in failure again would not need
            // our help.
            var thisToString = objToString.call(this);
            if (thisToString === baseToString) {
              throw new TypeError('May not mutate internal state of a ' +
                                  classString + '.prototype');
            } else {
              throw new TypeError('Unexpected: ' + thisToString);
            }
          }
        }
        return originalMethod.apply(this, arguments);
      }
      Object.defineProperty(proto, name, { value: replacement });
    }
    return mutableProtoPatcher;
  }