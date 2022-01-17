function(selector){
      return this.length > 0 && $(this[0]).filter(selector).length > 0;
    }