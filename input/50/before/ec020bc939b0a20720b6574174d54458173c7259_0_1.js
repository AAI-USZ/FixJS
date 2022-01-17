function(){
      if (__this.curried) {
        return util('curry') + "(" + code + ")";
      } else {
        return code;
      }
    }