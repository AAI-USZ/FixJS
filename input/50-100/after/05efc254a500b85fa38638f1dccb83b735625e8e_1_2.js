function(f, scope) {
      var length = this.length, index = 0;
      checkFirstArgumentExists(arguments);
      while(index < length) {
        if(index in this && multiMatch(this[index], f, scope, [this[index], index, this])) {
          return true;
        }
        index++;
      }
      return false;
    }