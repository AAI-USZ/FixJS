function(event) {
    call(callback, {
      status: 500,
      error: event.type,
      reason: event.target
    });
  }