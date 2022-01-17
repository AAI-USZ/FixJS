function (info, cb) {
    title.handler(new RegExp(regexp).exec(info.message), cb);
  }