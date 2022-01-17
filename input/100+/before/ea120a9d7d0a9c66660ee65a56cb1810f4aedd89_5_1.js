function addScriptsAndCheckOrder(method, callback) {
  let vs = gDebugger.DebuggerView.Scripts;
  let ss = gDebugger.DebuggerController.SourceScripts;
  vs.empty();
  vs._scripts.removeEventListener("select", vs._onScriptsChange, false);

  let urls = [
    { href: "ici://some.address.com/random/", leaf: "subrandom/" },
    { href: "ni://another.address.org/random/subrandom/", leaf: "page.html" },
    { href: "san://interesting.address.gro/random/", leaf: "script.js" },
    { href: "si://interesting.address.moc/random/", leaf: "script.js" },
    { href: "si://interesting.address.moc/random/", leaf: "x/script.js" },
    { href: "si://interesting.address.moc/random/", leaf: "x/y/script.js?a=1" },
    { href: "si://interesting.address.moc/random/x/", leaf: "y/script.js?a=1&b=2" },
    { href: "si://interesting.address.moc/random/x/y/", leaf: "script.js?a=1&b=2&c=3" }
  ];

  urls.sort(function(a, b) {
    return Math.random() - 0.5;
  });

  switch (method) {
    case 1:
      urls.forEach(function(url) {
        let loc = url.href + url.leaf;
        vs.addScript(ss._getScriptLabel(loc, url.href), { url: loc });
      });
      vs.commitScripts();
      break;

    case 2:
      urls.forEach(function(url) {
        let loc = url.href + url.leaf;
        vs.addScript(ss._getScriptLabel(loc, url.href), { url: loc }, true);
      });
      break;

    case 3:
      let i = 0
      for (; i < urls.length / 2; i++) {
        let url = urls[i];
        let loc = url.href + url.leaf;
        vs.addScript(ss._getScriptLabel(loc, url.href), { url: loc });
      }
      vs.commitScripts();

      for (; i < urls.length; i++) {
        let url = urls[i];
        let loc = url.href + url.leaf;
        vs.addScript(ss._getScriptLabel(loc, url.href), { url: loc }, true);
      }
      break;
  }

  executeSoon(function() {
    checkScriptsOrder(method);
    callback();
  });
}