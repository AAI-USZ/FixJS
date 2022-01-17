function() {
      var mdl = this.model.toJSON();
      console.log('adiview render pitch ' + mdl.pitch.toString() );
      this.adi.setAttitude( mdl.pitch, mdl.roll );
      return this;
    }