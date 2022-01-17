    get linearization() {
      var length = this.stream.length;
      var linearization = false;
      try {
        if (length) {
          linearization = new Linearization(this.stream);
          if (linearization.length != length)
            linearization = false;
        }
      } catch (err) {
        warn('since pdf is broken pdf.js is trying to recover it ' +
             'by indexing the object; ' +
             'the error in firebug shall have a different origin');
      }
      // shadow the prototype getter with a data property
      return shadow(this, 'linearization', linearization);
    },
