function hashFor(onChangeEvent) {
  var newURL = onChangeEvent.newURL;
  if (newURL) {
      return newURL.replace(/.*#/, '');
  }
  return dloc.hash.replace(/^#/, '');
}