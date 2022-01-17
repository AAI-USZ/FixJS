function exposePlugins(isGlobal, target, mixin) {
    for (var i in mixin) {
      if (i === 'stage') {
        continue; // don't allow stage to be overwritten
      }
      if (isGlobal) {
        // Make sure any global assignment errors don't prevent other
        // properties from being exposed. (e.g. trying to expose `Infinity`)
        var descriptor = Object.getOwnPropertyDescriptor(target, i);
        if (!descriptor || descriptor.writable) {
          target[i] = mixin[i];
        }
      } else {
        target[i] = mixin[i];
      }
    }
  }