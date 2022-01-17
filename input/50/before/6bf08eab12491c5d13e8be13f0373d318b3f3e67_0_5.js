function () {
        Ember.trySetPath(Ember.isGlobalPath(fromPath) ? window : obj, fromPath, toValue);
      }