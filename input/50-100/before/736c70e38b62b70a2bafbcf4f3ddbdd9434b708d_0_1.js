function extend(target) {
    var mixins = [].slice.call(arguments, 1);

    for(var index = 0, mixin; mixin = mixins[index]; ++index) {
      for(var key in mixin) {
        target[key] = mixin[key];
      }
    }

    return target;
  }