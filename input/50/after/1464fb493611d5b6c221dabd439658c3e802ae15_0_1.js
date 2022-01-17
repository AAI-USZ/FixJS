function(new_default_locale) {
    if (exists(new_default_locale)) {
      new_default_locale = new_default_locale.toLowerCase()
    }
    self._default_locale = new_default_locale;
  }