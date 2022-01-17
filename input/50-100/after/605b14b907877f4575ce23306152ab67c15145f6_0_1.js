function (phrase, params) {
    try {
      return nodeca.runtime.i18n.t(nodeca.runtime.locale, phrase, params);
    } catch (err) {
      nodeca.logger.error('Failed translate phrase', phrase, params, err);
      return phrase;
    }
  }