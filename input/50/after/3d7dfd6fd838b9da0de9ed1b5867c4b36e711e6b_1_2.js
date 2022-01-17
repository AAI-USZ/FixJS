function() {
  var locale = localStorage.locale || Thin.getDefaultLocale();
  return Thin.LOCALES[locale] ? locale : 'en';
}