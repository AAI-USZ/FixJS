function(selector){
      return this.length > 0 && zepto.matches(this[0], selector)
    }