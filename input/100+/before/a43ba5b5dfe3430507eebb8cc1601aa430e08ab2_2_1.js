function() {
      /* Set local models passed in as options */
      this.attitudeModel   = this.options.attitudeModel;
      this.vfrHudModel     = this.options.vfrHudModel;
      this.statusTextModel = this.options.statusTextModel;
      this.heartbeatModel  = this.options.heartbeatModel;

      /* Create pfd object */
      this.pfd = new pfd.PFD('pfd');

      /* Register callbacks */
      this.attitudeModel.bind  ('change', this.onAttitudeChange,   this);
      this.vfrHudModel.bind    ('change', this.onVfrHudChange,     this);
      this.statusTextModel.bind('change', this.onStatusTextChange, this);
      this.heartbeatModel.bind ('change', this.onHeartbeatChange,  this);

      /* Set off each callback to initialize view */
      this.onAttitudeChange();
      this.onVfrHudChange();
      this.onStatusTextChange();
      this.onHeartbeatChange();
      console.log('pfd view initialized');
    }