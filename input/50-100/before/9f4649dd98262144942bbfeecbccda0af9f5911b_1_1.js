function (msg) {
    if (this.backend == 'stdout') {
      this.util.log(msg);
    } else {
      this.util.log(this.util.LOG_INFO, msg);
    }
  }