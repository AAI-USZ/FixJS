function loadAndCallback() {
    listify(Tranquil[type].stylesheet).forEach(requireStylesheet);
    requireAllJavascript(Tranquil[type].javascript, callback);
  }