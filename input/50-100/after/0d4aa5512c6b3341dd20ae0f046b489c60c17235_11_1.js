function () {
      console.log('mmap model initialize');
      console.log(this);
      var mavlink = this.get('mavlinkSrc');
      this.gotgps = false;
      this.gps = mavlink.subscribe('GPS_RAW_INT', this.onGps, this);
    }