function() {
    this.addMatchers({
      toBeInstanceOf: function(className) {
        return this.actual instanceof Ext.ClassManager.get(className);
      }
    });
  }