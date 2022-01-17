function (message) {
    // Pretty message.
    var console = console || {error: function() {}};
    console.error(message); // See expand stacktrace for original error location.
    throw message; // Stop execution
  }