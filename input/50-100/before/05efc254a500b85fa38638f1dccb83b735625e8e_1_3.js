function(f, scope) {
      var length = this.length, index = 0, result = [];
      checkFirstArgumentExists(arguments);
      while(index < length) {
        if(index in this && multiMatch(this[index], f, scope, [index, this])) {
          result.push(this[index]);
        }
        index++;
      }
      return result;
    }