function(x) {
        var n = x.nodeName.toLowerCase();
        switch (n) {
          case "style": v = elem.style.cssText; break;
          default     : v = x.nodeValue;
        }
        return [n, v];
      }