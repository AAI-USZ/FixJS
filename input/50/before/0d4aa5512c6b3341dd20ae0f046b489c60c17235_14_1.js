function() {
      var att = this.attitudeModel.toJSON();
      this.pfd.setAttitude( att.pitch, att.roll );
      this.pfd.draw();
    }