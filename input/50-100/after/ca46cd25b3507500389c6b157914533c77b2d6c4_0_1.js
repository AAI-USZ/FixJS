function (r) {
    if (message.text.match(r.route)) {
      r.handler.call(r.module.context,
        { from: message.from, message: message.text
        , hostmask: message.raw.prefix, matches: message.text.match(r.route) },
        function (out) { output(r, out); });
    };
  }