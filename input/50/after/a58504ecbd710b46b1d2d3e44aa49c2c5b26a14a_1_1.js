function (info, cb) {
    title.handler(info.message.match(new RegExp(regexp)), cb); // FIXME: Closure problem.
  }