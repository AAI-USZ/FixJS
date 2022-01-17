function(e, type, attributes, style) {
  if (e) {
    if (e.tagName == "a") e = e.firstChild;
    if (e.tagName != type) {
      var n = this.create(type);
      e.parentNode.replaceChild(n, e);
      e = n;
    }
  } else {
    e = this.create(type);
  }
  for (var name in attributes) {
    var value = attributes[name];
    if (value == this.implicit.svg[name]) value = null;
    if (value == null) e.removeAttribute(name);
    else e.setAttribute(name, value);
  }
  for (var name in style) {
    var value = style[name];
    if (value == this.implicit.css[name]) value = null;
    if (value == null) {
        if (pv.renderer() != 'svgweb') // svgweb doesn't support removeproperty TODO SVGWEB
            e.style.removeProperty(name);
    }
    else e.style.setProperty(name, value);
  }
  return e;
}