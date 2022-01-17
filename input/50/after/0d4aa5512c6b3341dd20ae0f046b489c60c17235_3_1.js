function () {
      var mavlink = this.options.mavlinkSrc;
      this.model = mavlink.subscribe('VFR_HUD', this.onHeadingChange, this);
      this.drone = document.getElementById('droneicon');
    }