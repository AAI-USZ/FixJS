function(e, s) {
  var a = e.parentNode;
  if (a && (a.tagName != "a")) a = null;
  if (s.title) {
    if (!a) {
      a = this.create("a");
      if (e.parentNode) e.parentNode.replaceChild(a, e);
      a.appendChild(e);
    }

    // Set the title. Using xlink:title ensures the call works in IE
    // but only FireFox seems to show the title.
    // without xlink: in there, it breaks IE.
    a.setAttributeNS(this.xlink, "xlink:title", s.title);
    return a;
  }
  if (a) a.parentNode.replaceChild(e, a);
  return e;
}