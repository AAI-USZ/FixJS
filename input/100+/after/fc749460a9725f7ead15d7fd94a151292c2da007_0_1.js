function(uri, media) {
  if (document.createStyleSheet) {
    setTimeout(function() { document.createStyleSheet(uri); }, 15);
  } else {
    var s = document.createElement('link');
    s.setAttribute('href', uri);
    s.setAttribute('type','text/css');
    s.setAttribute('rel','stylesheet');
    if (media != '' && media != 'all')
      s.setAttribute('media', media);
    var ll = document.getElementsByTagName('link');
    var l = ll[ll.length - 1];
    l.parentNode.insertBefore(s, l.nextSibling);
  }
}