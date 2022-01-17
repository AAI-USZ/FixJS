function (r) {
    if (message.text.match(r.route)) {
      message.hostmask = message.raw.prefix;
      message.matches = message.text.match(r.route);
      r.handler.call(r.module.context, message,
        function (out) { output.call(r.module.context, r, out); });
    };
  }