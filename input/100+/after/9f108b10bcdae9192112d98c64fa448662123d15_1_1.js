function toSexp(elem) {
    var ret = {
      name: elem.nodeName.toLowerCase(),
      attr: {},
      chld: [],
      text: elem.nodeValue
    };

    if (isElemNode(ret)) {
      ret.attr = into({}, mapn(function(x) {
        var n = x.nodeName.toLowerCase();
        switch (n) {
          case "style": v = elem.style.cssText; break;
          default     : v = x.nodeValue;
        }
        return [n, v];
      }, filter(partial(assoc, _, "specified"), seq2vec(elem.attributes))));
      // ie7 workaround
      ret.attr.value = elem.value;
      ret.chld = mapn(toSexp, seq2vec(elem.childNodes));
    }

    return ret;
  }