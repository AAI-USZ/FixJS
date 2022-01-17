function(clazz) {
    var k, patch, v, _results;
    if (clazz === null) {
      return null;
    }
    if (['String', 'Number'].indexOf(clazz.name) === -1) {
      throw new Error('can only patch String and Number');
    }
    _results = [];
    for (k in be) {
      v = be[k];
      if (typeof v === 'function' && clazz.name.toLowerCase() === typeof (v(null))) {
        console.log(">>> patching '", k, "' function into", clazz.name, "class");
        patch = "be['" + k + "'](this)";
        _results.push(clazz.prototype[k] = function() {
          return eval(patch);
        });
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  }