function(uri, media) {
  if (document.createStyleSheet) {
    setTimeout(function() { document.createStyleSheet(uri); }, 15);
  } else {
    var s = document.createElement('link');
    s.setAttribute('type', 'text/css');
    s.setAttribute('href', uri);
    s.setAttribute('type','text/css');
    s.setAttribute('rel','stylesheet');
    if (media != '' && media != 'all')
      s.setAttribute('media', media);
    var h = document.getElementsByTagName('head')[0];
    h.appendChild(s);
  }
}