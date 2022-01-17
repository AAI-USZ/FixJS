function (level, msg, obj) {
    if (window.console) {
      if (obj) {
        console.log("[%s] %s: %o", level.toUpperCase(), msg, obj);
      } else {
        console.log("[%s] %s",level.toUpperCase(), msg);
      }
    }
    return this;
  }