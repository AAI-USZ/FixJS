function (r) {
    if (message.text.match(r.route)) {
      message.matches = message.text.match(r.route);
      handle(r, message);
    };
  }