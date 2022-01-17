function ( reason, message ) {
    this.type = "trackevent-update";
    this.reason = reason;
    this.message = message;
    this.toString = function () {
      return "TrackEvent update failed: " + message;
    };
  }