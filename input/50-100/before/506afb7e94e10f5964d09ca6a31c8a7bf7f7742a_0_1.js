function () {
  var browserLang;

  try {
    if (this.config.lang)
      browserLang = this.config.lang;
    if (navigator.userLanguage) // IE
      browserLang = navigator.userLanguage;
    else if (navigator.language) // FF + Webkit
      browserLang = navigator.language;

    browserLang = browserLang.substring(0,2).toLowerCase();
  } catch (exc) {
    browserLang = "en";
  }

  return browserLang;
}