function toSexp(elem) {
    var ret = {
      name: elem.nodeName.toLowerCase(),
      attr: {},
      chld: [],
      text: elem.nodeValue
    };

    if (ret.name.substr(0,1) !== "#") {
      ret.attr = into({}, mapn(function(x) {
        return [x.nodeName.toLowerCase(), x.nodeValue];
      }, filter(partial(assoc, _, "specified"), seq2vec(elem.attributes))));
      ret.chld = mapn(toSexp, seq2vec(elem.childNodes));
    }

    return ret;
  }