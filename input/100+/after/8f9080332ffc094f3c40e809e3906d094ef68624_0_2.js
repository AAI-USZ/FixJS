function(locale, path, key) {
  var attempts = [];
  var template = undefined;
  for (var i = 0; i < locale.length; i++) {
    var currentLocale = locale[i];

    var context = exists(path) ? path.slice(0) : [];
    context.unshift(currentLocale);
    context.push(key);

    while (context.length > 1 && !exists(template)) {
      template = this.back.navigate(context.join('.'));
      attempts.push( context.slice(0) );
      context.splice(1, 1);
    }
  }
  if (!exists(template)) {
    throw TranslationNotFoundError(key, attempts);
  }
  
  return template;  
}