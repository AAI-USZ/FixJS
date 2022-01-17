function(selector){
      return filtered(uniq(this.pluck('parentNode')), selector)
    }