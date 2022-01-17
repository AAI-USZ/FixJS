function(options) {
    options = options || {};
    var query = ''
      , i;

    // Delete all other options
    for(i in this.supportedOptions) {
      delete options[this.supportedOptions[i]];
    }

    if(!utils.object.isEmpty(options)) {
      options = utils.object.toArray(options);

      for(i in options) {
        query += i == 0 ? '?' : '&';
        query += this.escape(options[i].key) + '=' + this.escape(options[i].value);
      }
    } else {
      return query;
    }

    return query;
  }