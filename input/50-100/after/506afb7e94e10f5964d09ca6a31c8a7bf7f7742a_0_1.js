function () {
  var browserLang;
  
  try {
    if (this.config.lang)
      browserLang = this.config.lang;
    else if (navigator.userLanguage) // IE
      browserLang = navigator.userLanguage;
    else if (navigator.language) // FF + Webkit
      browserLang = navigator.language;
  } catch (exc) {
    browserLang = "en";
  }
  return browserLang;
}