function toSexp(elem) {
    var ret = {
      name: elem.nodeName.toLowerCase(),
      attr: {},
      chld: [],
      text: elem.nodeValue
    };

    if (isElemNode(ret)) {
      ret.attr = into({}, mapn(function(x) {
        return [x.nodeName.toLowerCase(), x.nodeValue];
      }, filter(partial(assoc, _, "specified"), seq2vec(elem.attributes))));
      // ie7 doesn't have a value attribute for form elements
      ret.attr.value = elem.value;
      ret.chld = mapn(toSexp, seq2vec(elem.childNodes));
    }

    return ret;
  }