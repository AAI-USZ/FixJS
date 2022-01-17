function exposePlugins(isGlobal, target, mixin) {
    for (var i in mixin) {
      if (i === 'stage') {
        continue; // don't allow stage to be overwritten
      }
      if (isGlobal) {
        // Make sure any global assignment errors don't prevent other
        // properties from being exposed. (e.g. trying to expose `Infinity`)
        try {
          target[i] = mixin[i];
        } catch(e) {}
      } else {
        target[i] = mixin[i];
      }
    }
  }