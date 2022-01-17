function (msg, type) {
    if (this.backend == 'stdout') {
      if (!type) {
        type = 'DEBUG: ';
      }
      this.util.log(DEBUG + msg);
    } else {
      if (!type) {
        type = this.util.LOG_INFO;
      } else if (type == 'debug') {
        type = this.util.LOG_DEBUG;
      }
      this.util.log(this.util.LOG_INFO, msg);
    }
  }