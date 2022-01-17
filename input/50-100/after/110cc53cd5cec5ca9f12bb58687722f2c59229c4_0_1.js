function() {
      var alt_error = this.navControllerOutput.get('alt_error');
      var aspd_error = this.navControllerOutput.get('aspd_error');
      if (Math.abs(alt_error) > 0) {
        this.pfd.setTargetAltitude(this.vfrHud.get('alt') + alt_error);
      }
      if (Math.abs(aspd_error) > 0) {
        this.pfd.setTargetSpeed(this.vfrHud.get('airspeed') + aspd_error);
      }
    }