function injectMessage(options) {
    pure.injectMessage(options.protocol, {
      'message': options.body,
      'class': options.cssClass
    });
    scrollLock(options);
  }