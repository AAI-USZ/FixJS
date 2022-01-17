function(s) {
  if (!this.parent) {
    var c = s.canvas;
    if (c) {
      /* Clear the container if it's not associated with this panel. */
      if (c.$panel != this) {
        c.$panel = this;
        while (c.lastChild) c.removeChild(c.lastChild);
      }

      /* If width and height weren't specified, inspect the container. */
      var w, h;
      if (s.width == null) {
        w = parseFloat(pv.css(c, "width"));
        s.width = w - s.left - s.right;
      }
      if (s.height == null) {
        h = parseFloat(pv.css(c, "height"));
        s.height = h - s.top - s.bottom;
      }
    } else {
      var cache = this.$canvas || (this.$canvas = []);
      if (!(c = cache[this.index])) {
        c = cache[this.index] = document.createElement(pv.renderer() == "svgweb" ? "div" : "span"); // SVGWeb requires a div, not a span
        this.$dom // script element for text/javascript+protovis
            ? this.$dom.parentNode.insertBefore(c, this.$dom)
            : lastElement().appendChild(c);
      }
    }
    s.canvas = c;
  }
  if (!s.transform) s.transform = pv.Transform.identity;
  pv.Bar.prototype.buildImplied.call(this, s);
}