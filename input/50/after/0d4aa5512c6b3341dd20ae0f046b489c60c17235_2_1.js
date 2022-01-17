function() {
      /* Only initialize the server.
       * Mav is uninitialized until first heartbeat. */
      var mavlink = this.get('mavlinkSrc');
      mavlink.subscribe('HEARTBEAT', this.onHeartbeat, this);
      this.resetServerTimeout();
    }