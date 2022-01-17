function getIdentifiersFromUrl(url) {
    var urlParts = getUrlParts(url);
    var identifiers = [urlParts.filename.split('.').pop()];

    if (urlParts.fragment) {
      var args = urlParts.fragment.split('='), i;
      if ((i = args.indexOf('sight')) > -1) {
        identifiers.unshift(args[i+1]);
      }
    }

    return identifiers;
  }