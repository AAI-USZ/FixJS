function getVariant(locale) {
    if(!locale) locale = Date['currentLocale'];
    return locale != 'en' && locale != 'en-US';
  }