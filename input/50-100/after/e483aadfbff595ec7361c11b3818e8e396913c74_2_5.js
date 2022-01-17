function(selector,context){
      return $(uniq(this.concat($(selector,context))))
    }