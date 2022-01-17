function(parent){
    this.request.__proto__ = parent.request;
    this.response.__proto__ = parent.response;
    this.engines.__proto__ = parent.engines;
    this.viewCallbacks = parent.viewCallbacks.slice(0);
  }