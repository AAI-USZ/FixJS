function () {
        Ember.trySet(Ember.isGlobalPath(fromPath) ? window : obj, fromPath, toValue);
      }