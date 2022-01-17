function (msg, obj) {
    if (window.console) {
      if (obj) {
        console.log("%s: %o", msg, obj);
      } else {
        console.log(msg);
      }
    }
    return this;
  }