function injectMessage(options, port) {
    pure.injectMessage(options.protocol, {
      'message': options.body,
      'class': options.cssClass
    }, port);
    scrollLock(options, port);
  }