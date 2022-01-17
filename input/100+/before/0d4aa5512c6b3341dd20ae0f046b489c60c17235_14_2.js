function() {
      var alt_error = this.navControllerOutputModel.get('alt_error');
      var aspd_error = this.navControllerOutputModel.get('aspd_error');
      if (Math.abs(alt_error) > 0) {
        this.pfd.setTargetAltitude(this.vfrHudModel.get('alt') + alt_error);
      }
      if (Math.abs(aspd_error) > 0) {
        this.pfd.setTargetAltitude(this.vfrHudModel.get('airspeed') + aspd_error);
      }
    }