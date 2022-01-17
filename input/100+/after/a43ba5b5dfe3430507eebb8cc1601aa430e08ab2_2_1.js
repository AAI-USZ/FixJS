function() {
      /* Set local models passed in as options */
      this.attitudeModel   = this.options.attitudeModel;
      this.vfrHudModel     = this.options.vfrHudModel;
      this.statusTextModel = this.options.statusTextModel;
      this.navControllerOutputModel = this.options.navControllerOutputModel;
      this.heartbeatModel  = this.options.heartbeatModel;

      /* Create pfd object */
      this.pfd = new pfd.PFD('pfd');

      /* Register callbacks */
      this.attitudeModel.bind  ('change', this.onAttitudeChange,   this);
      this.vfrHudModel.bind    ('change', this.onVfrHudChange,     this);
      this.statusTextModel.bind('change', this.onStatusTextChange, this);
      this.heartbeatModel.bind ('change', this.onHeartbeatChange,  this);
      this.navControllerOutputModel.bind('change', this.onNavControllerOutputChange, this);

      /* Set off each callback to initialize view */
      this.onAttitudeChange();
      this.onVfrHudChange();
      this.onStatusTextChange();
      this.onHeartbeatChange();
      this.onNavControllerOutputChange();
      console.log('pfd view initialized');
    }