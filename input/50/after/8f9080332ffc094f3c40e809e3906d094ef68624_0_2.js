function() {
    return (typeof self._locale === "undefined" || self._locale === null) ? [ self._default_locale ] : self._locale;
  }