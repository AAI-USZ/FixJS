function() {
      var spaces = this.split('.'), scope = globalContext;
      spaces.forEach(function(s) {
        if(scope) {
          scope = scope[s];
        }
      });
      return scope;
    }