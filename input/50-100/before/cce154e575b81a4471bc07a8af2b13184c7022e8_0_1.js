function setup_redirect(aSettings) {
  var url = "https://example.com/browser/toolkit/mozapps/extensions/test/xpinstall/redirect.sjs?mode=setup";
  for (var name in aSettings) {
    url += "&" + name + "=" + aSettings[name];
  }

  var req = new XMLHttpRequest();
  req.open("GET", url, false);
  req.send(null);
}