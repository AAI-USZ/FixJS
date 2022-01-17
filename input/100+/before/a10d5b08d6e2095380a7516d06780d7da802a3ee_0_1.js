function(aContentLocation, aRequestOrigin) {
    // Note: Don't OK the origin scheme "moz-nullprincipal" without further
    // understanding. It appears to be the source when test8.html is used. That
    // is, javascript redirect to a "javascript:" url that creates the entire
    // page's content which includes a form that it submits. Maybe
    // "moz-nullprincipal" always shows up when using "document.location"?

    // Not cross-site requests.
    if (aContentLocation.scheme == "resource"
        || aContentLocation.scheme == "about"
        || aContentLocation.scheme == "data"
        || aContentLocation.scheme == "chrome"
        || aContentLocation.scheme == "moz-icon"
        || aContentLocation.scheme == "moz-filedata"
        || aContentLocation.scheme == "wyciwyg"
        || aContentLocation.scheme == "javascript") {
      return true;
    }

    if (aRequestOrigin == undefined || aRequestOrigin == null) {
      return true;
    }

    try {
      // The asciiHost values will exist but be empty strings for the "file"
      // scheme, so we don't want to allow just because they are empty strings,
      // only if not set at all.
      aRequestOrigin.asciiHost;
      aContentLocation.asciiHost;
      // The spec can be empty if odd things are going on, like the Refcontrol
      // extension causing back/forward button-initiated requests to have
      // aRequestOrigin be a virtually empty nsIURL object.
      var missingSpecOrHost = aRequestOrigin.spec === "";
    } catch (e) {
      missingSpecOrHost = true;
    }

    if (missingSpecOrHost) {
      requestpolicy.mod.Logger.info(requestpolicy.mod.Logger.TYPE_CONTENT,
          "No asciiHost or empty spec on either aRequestOrigin <"
              + aRequestOrigin.spec + "> or aContentLocation <"
              + aContentLocation.spec + ">");
      return true;
    }

    var destHost = aContentLocation.asciiHost;

    // "global" dest are [some sort of interal requests]
    // "browser" dest are [???]
    if (destHost == "global" || destHost == "browser") {
      return true;
    }

    if (aRequestOrigin.scheme == 'about'
        && aRequestOrigin.spec.indexOf("about:neterror?") == 0) {
      return true;
    }

    // If there are entities in the document, they may trigger a local file
    // request. We'll only allow requests to .dtd files, though, so we don't
    // open up all file:// destinations.
    if (aContentLocation.scheme == "file"
        && /.\.dtd$/.test(aContentLocation.path)) {
      return true;
    }

    return false;
  }