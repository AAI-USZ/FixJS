function(key, target, e) {
      return {
        key: key,
        dispatcher: this,
        keys: activeKeys,
        target: target,
        e: e
      };
    }