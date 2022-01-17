function(key, target, e) {
      return {
        key: key,
        dispatcher: this,
        keys: this.activeKeys,
        target: target,
        e: e
      };
    }