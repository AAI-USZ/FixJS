function getUrlParts(url) {
    var uri;

    url = url.replace(/\/+$/, '');
    uri = URI(url);

    return {
      filename: uri.path().split('/').pop(),
      fragment: uri.fragment()
    };
  }