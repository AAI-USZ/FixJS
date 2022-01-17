function(new_locale) {
    // convert to an array if not
    if (!_.isArray(new_locale)) {
      new_locale = [new_locale];
    }
    // lower case all entries
    new_locale = _.map(new_locale, function(localeString){
      return localeString.toLowerCase();
    });
    // add default locale at the end
    if (exists(this._default_locale)) {
      new_locale.push(this._default_locale);
    }
    // remove duplicates
    new_locale = _.uniq(new_locale);

    self._locale = new_locale;
  }