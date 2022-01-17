function compare (actual, expected) {
  if (typeof expected == "string") {
    expected = new (xmldom.DOMParser)().parseFromString(expected).documentElement;
  }
  var e, a, aa, ea, name, at = [], et = [], remainder;
  actual = flatten(actual);
  expected = flatten(expected);
  a = actual.shift();
  while (expected.length) {
    e = expected.shift();
    switch (e.nodeType) {
    case 1:
      while (a.nodeType == 3 && actual.length) {
        at.push(a.nodeValue);
        a = actual.shift();
      }
      if (a.nodeType != 1) return false;
      if (a.start != e.start) return false;
      if (at.join("").trim() != et.join("").trim()) return false;
      a = a.element;
      e = e.element;
      aa = attributes(a);
      ea = attributes(e);
      for (name in ea) {
        if (!aa[name]) return false;
        if (ea[name].nodeValue != aa[name].nodeValue) return false;
      }
      at.length = et.length = 0;
      a = actual.shift();
      break;
    case 3:
      et.push(e.nodeValue);
      break;
    default:
      throw new Error("Unexpected nodeType: " + e.nodeType);
    }
  }
  while (actual.length) {
    a = actual.shift();
    if (a.nodeType != 3 || a.nodeValue.trim() != "") return false;
  }
  while (expected.length) {
    e = expected.shift();
    if (e.nodeType != 3 || e.nodeValue.trim() != "") return false;
  }
  return true;
}