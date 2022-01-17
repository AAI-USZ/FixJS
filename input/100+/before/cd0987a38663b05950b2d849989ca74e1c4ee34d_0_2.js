function init() {
  signature = dojo.byId('signature');
  maincontent = dojo.byId('maincontent');
  signatureVisible = false;

  if (!location.hash) {
    dojo.byId('search-box').focus();
    return;
  }

  // hash may have line number, or line number + name separated by /
  var parts = location.hash.split('#')[1].split('/');
  if (parts[0]) {
    var l;
    // Deal with #l323 vs. #323
    if (/^l\d+/.exec(parts[0]))
      l = dojo.byId(parts[0]);
    else
      l = dojo.byId('l' + parts[0]);
    l.scrollIntoView();

    if (parts[1] && l.hasChildNodes()) {
      var children = l.childNodes;
      for (var i = 0; i < children.length; i++) {
        // TODO: what about case of multiple items in line with same name?
        if (children[i].innerHTML == parts[1]) {
          // XXX: what's up with this, dojo?
          setTimeout(function() { showInfo(children[i]); }, 0);
          break;
        }
      }
    }
  }

  // Figure out the right path separator to use with virtroot
  sep = virtroot[virtroot.length - 1] === '/' ? '' : '/';
}