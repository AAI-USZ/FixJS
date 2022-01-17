function(localCode) {
      var code = localCode || this.code;
      return code === 'en' || code === 'en-US' ? true : this['variant'];
    }