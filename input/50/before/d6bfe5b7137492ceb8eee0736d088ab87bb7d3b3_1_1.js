function() {
      var mdl = this.model.toJSON();
      this.adi.setAttitude( mdl.pitch, mdl.roll );
      return this;
    }