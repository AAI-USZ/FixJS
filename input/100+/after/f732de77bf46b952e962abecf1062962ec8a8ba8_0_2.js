function(clazz) {
    var k, patch, v;
    if (clazz === null) {
      return null;
    }
    if (['String', 'Number'].indexOf(clazz.name) === -1) {
      throw new Error('can only patch String and Number');
    }
    for (k in be) {
      v = be[k];
      if (typeof v === 'function' && clazz.name.toLowerCase() === typeof (v(null))) {
        if (this._quiet) {
          console.log(">>> patching '", k, "' function into", clazz.name, "class");
        }
        patch = "be['" + k + "'](this)";
        clazz.prototype[k] = function() {
          return eval(patch);
        };
      }
    }
    if (this._quiet) {
      return void 0;
    } else {
      return clazz.name + ' patched!';
    }
  }