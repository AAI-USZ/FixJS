function(options) {
  var locale = undefined;
  
  // Use the locale from the provided options (if a valid object) as our first choice.
  if ( exists(options) ) locale = options["locale"];

  // If that didn't work, then ask for the current locale and trust that 
  // we'll get back either the explicitly defined locale or the default_locale.
  if ( !exists(locale) ) locale = this.locale;
  
  return locale;
}