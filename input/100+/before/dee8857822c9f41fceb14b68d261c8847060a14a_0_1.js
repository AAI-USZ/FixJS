function (msg, type) {
    if (this.backend == 'stdout') {
      if (!type) {
        type = 'DEBUG: ';
      }
      this.util.log(DEBUG + msg);
    } else {
      if (!type) {
        type = this.level
        if (!this.util[type]) {
          throw "Undefined log level: " + type;
        }
      } else if (type == 'debug') {
        type = "LOG_DEBUG";
      }
      this.util.log(this.util[type], msg);
    }
  }