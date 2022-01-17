    get linearization() {
      var length = this.stream.length;
      var linearization = false;
      if (length) {
        try {
          linearization = new Linearization(this.stream);
          if (linearization.length != length)
            linearization = false;
        } catch (err) {
          warn('The linearization data is not available ' +
               'or unreadable pdf data is found');
        }
      }
      // shadow the prototype getter with a data property
      return shadow(this, 'linearization', linearization);
    },
