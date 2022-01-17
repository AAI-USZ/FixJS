function hashFor(onChangeEvent) {
  var newURL = onChangeEvent ? onChangeEvent.newURL : null;
  if (newURL) {
      return newURL.replace(/.*#/, '');
  }
  return dloc.hash.replace(/^#/, '');
}