function() {
      var mavlinkSrc = this.options.mavlinkSrc;

      // Too bad backbone doesn't pass the model to event handlers; we
      // wouldn't need to keep these handles to models.
      this.attitude = mavlinkSrc.subscribe('ATTITUDE', this.onAttitudeChange, this);
      this.vfrHud = mavlinkSrc.subscribe('VFR_HUD', this.onVfrHudChange, this);
      this.statusText = mavlinkSrc.subscribe('STATUSTEXT', this.onStatusTextChange, this);
      this.navControllerOutput = mavlinkSrc.subscribe(
        'NAV_CONTROLLER_OUTPUT', this.onNavControllerOutputChange, this);
      this.heartbeat = mavlinkSrc.subscribe('HEARTBEAT', this.onHeartbeatChange, this);

      /* Create pfd object */
      this.pfd = new pfd.PFD('pfd');

      /* Set off each callback to initialize view */
      this.onAttitudeChange();
      this.onVfrHudChange();
      this.onStatusTextChange();
      this.onHeartbeatChange();
      this.onNavControllerOutputChange();
      console.log('pfd view initialized');
    }