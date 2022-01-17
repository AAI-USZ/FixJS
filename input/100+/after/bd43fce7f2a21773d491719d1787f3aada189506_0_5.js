function (r) {
    if (message.match(r.route)) {
      r.handler.call(r.module,
        { from: from
        , message: message
        , hostmask: raw.prefix
        , matches: message.match(r.route)
        }, function (out) { output(r, out); }
      );
    };
  }