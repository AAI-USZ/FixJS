function(url) {
        let loc = url.href + url.leaf;
        vs.addScript(ss._getScriptLabel(loc, url.href), { url: loc }, true);
      }