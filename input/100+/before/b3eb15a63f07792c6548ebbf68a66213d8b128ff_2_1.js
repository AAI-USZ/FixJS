function() {

  Element.name = 'Element';

  Element.prototype.isVoid = function() {
    return this.tag in {
      area: true,
      base: true,
      br: true,
      col: true,
      hr: true,
      img: true,
      input: true,
      link: true,
      meta: true,
      param: true,
      command: true,
      keygen: true,
      source: true
    };
  };

  function Element(tag, attributes, text) {
    this.tag = tag;
    this.attributes = attributes != null ? attributes : {};
    this.text = text != null ? text : '';
  }

  Element.prototype.headerKey = function() {
    switch (this.tag) {
      case 'meta':
        if ('charset' in this.attributes) {
          return 'meta-charset';
        } else if ('name' in this.attributes) {
          return "meta-name-" + this.attributes.name;
        } else if ('http-equiv' in this.attributes) {
          return "meta-http-" + this.attributes['http-equiv'];
        }
        break;
      case 'title':
        return 'title';
      case 'link':
        return "link-" + this.attributes.rel + "-" + this.attributes.href;
      case 'script':
        return "script-" + this.attributes.src;
      case 'style':
        return "style-" + this.attributes['data-href'];
    }
  };

  Element.prototype.toString = function() {
    var html, name, value, _ref;
    html = "<" + this.tag;
    _ref = this.attributes;
    for (name in _ref) {
      value = _ref[name];
      html += " " + name + "=\"" + (escapeXML(value)) + "\"";
    }
    html += !this.text && this.isVoid() ? ' />' : ">" + this.text + "</" + this.tag + ">";
    return html;
  };

  return Element;

}