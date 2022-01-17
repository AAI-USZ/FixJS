function(url) {
        let loc = url.href + url.leaf;
        vs.addScript(ss.getScriptLabel(loc, url.href), { url: loc });
      }