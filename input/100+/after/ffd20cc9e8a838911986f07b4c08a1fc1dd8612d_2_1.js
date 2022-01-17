function(key) {
      var dataScheme = this.options.dataScheme;
      return dataScheme ? (dataScheme + '://' + key) : key;
    }