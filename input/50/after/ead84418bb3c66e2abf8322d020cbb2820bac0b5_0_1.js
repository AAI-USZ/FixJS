function (message) {
    // Pretty message.
    var console = console || {info: function() {}};
    console.info(message); // See expand stacktrace for original error location.
  }