function getUrlParts(url) {
    var parts = url.split('/');
    var baseAndParams = parts.pop().split('?');
    var basename = baseAndParams.shift().toLowerCase();
    var fileAndFragment = basename.split('#');
    var filename = fileAndFragment.shift();
    var fragment = fileAndFragment.pop();
    return { filename: filename, fragment: fragment };
  }