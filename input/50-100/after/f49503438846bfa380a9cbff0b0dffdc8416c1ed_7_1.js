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