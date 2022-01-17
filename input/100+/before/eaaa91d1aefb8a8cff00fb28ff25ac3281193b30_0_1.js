function() {
    if(this.running) return;
    var timeout = this.cronTime.getTimeout();
    if (this.cronTime.realDate) this.runOnce = true;

    if (timeout >= 0) {
      this.running = true;
      this._timeout = setTimeout(function(self) {
            self.running = false;

            //start before calling back so the callbacks have the ability to stop the cron job
            if (!(self.runOnce)) self.start();;

            self._callback();
          }, timeout, this);
    } else {
      this.running = false;
    }
  }