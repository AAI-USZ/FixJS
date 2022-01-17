function() {
      var scope = globalContext;
      iterateOverObject(this.split('.'), function(i,s) {
          return !!(scope = scope[s]);
      });
      return scope;
    }