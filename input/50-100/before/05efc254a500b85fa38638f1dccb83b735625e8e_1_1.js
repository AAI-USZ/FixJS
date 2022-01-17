function(f, scope) {
      var length = this.length, index = 0;
      checkFirstArgumentExists(arguments);
      while(index < length) {
        if(index in this && !multiMatch(this[index], f, scope, [index, this])) {
          return false;
        }
        index++;
      }
      return true;
    }