function(name){
      if (this.length < 1) return false;
      else return classRE(name).test(this[0].className);
    }