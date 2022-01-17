function() {
        var interval;
        interval = this.get('interval');
        return this.time() > this.nextFetch && this.needRefresh && (interval != null) && interval > 0;
      }