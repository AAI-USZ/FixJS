function(options) {
    // Returns a String containing the user and password in the format 'user:password@'
    if(options.username && options.password) {
      return this.escape(options.username) + ':' + this.escape(options.password) + '@';
    } else {
      return '';
    }
  }