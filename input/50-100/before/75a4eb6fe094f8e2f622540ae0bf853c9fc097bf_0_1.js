function loadType(type, callback, error) {
  if (Tranquil[type]) { callback() }

  requireJavascript('/javascript/' + type + '.js', function() {
    if (!Tranquil[type]) { error && error() }

    listify(Tranquil[type].stylesheet).forEach(requireStylesheet);
    requireAllJavascript(Tranquil[type].javascript, callback);
  });
}