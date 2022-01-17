function(dt, radar) {
      this.fx = this.fy = this.dbearing = 0;
      return this.step_target.apply(null, [dt, this.to_state(radar)]);
    }