function(event, selector, callback){
    return selector === undefined || $.isFunction(selector) ?
      this.bind(event, selector) : this.delegate(selector, event, callback);
  }