function(event, selector, callback){
    return selector === undefined || $.isFunction(selector) ?
      this.unbind(event, selector) : this.undelegate(selector, event, callback);
  }