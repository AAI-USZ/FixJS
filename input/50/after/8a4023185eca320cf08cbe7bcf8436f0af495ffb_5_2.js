function MockUI(controller) {
    var that = this;
    this.lastError = null;

    this.refresh = function() {};
    this.handleError = function(message, status) {
      that.lastError = message;
    };
  }