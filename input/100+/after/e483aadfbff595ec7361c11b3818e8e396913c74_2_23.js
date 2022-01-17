function(event, callback){
    $(document.body).undelegate(this.selector, event, callback)
    return this
  }