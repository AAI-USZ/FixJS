function MockUI(controller) {
    this.lastError = null,

    this.refresh = function() {};
    this.handleError = function(message, status) {
      this.lastError = message;
    }
  }