function wait(reason, options) {
  once(APP_STARTUP, function() {
    startup(null, options);
  });
}