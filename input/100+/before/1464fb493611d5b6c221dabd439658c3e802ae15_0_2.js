function(locale, path, key) {
  var context = exists(path) ? path.slice(0) : [];
  context.unshift(locale);
  context.push(key);

  var attempts = [];
  var template = undefined;
  while (context.length > 1 && !exists(template)) {
    template = this.back.navigate(context.join('.'));
    attempts.push( context.slice(0) );
    context.splice(1, 1);
  }

  if (!exists(template)) {
    throw TranslationNotFoundError(key, attempts);
  }
  
  return template;  
}