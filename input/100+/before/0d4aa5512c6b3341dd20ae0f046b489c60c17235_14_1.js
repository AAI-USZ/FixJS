function () {
      var alt = this.vfrHudModel.get('alt');
      this.pfd.setAltitude(alt);
      var air = this.vfrHudModel.get('airspeed');
      this.pfd.setSpeed(air);
      this.pfd.draw();
    }