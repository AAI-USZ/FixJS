function(){
      if (__this.curried) {
        if (__this.hasSplats) {
          __this.carp('cannot curry a function with a variable number of arguments');
        }
        return util('curry') + "(" + code + ")";
      } else {
        return code;
      }
    }