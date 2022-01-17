function() {
        var interval;
        interval = this.get('redrawInterval');
        return this.time() > this.nextFetch && this.needRefresh && (interval != null) && interval > 0;
      }