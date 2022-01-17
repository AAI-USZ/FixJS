function() {
    var tagName = this.element.extendsTagName;
    var created = this.created;
    var extended = function() {
      var element = document.createElement(tagName);
      extended.prototype.__proto__ = element.__proto__;
      element.__proto__ = extended.prototype;
      created.call(element);
    };
    extended.prototype = this.elementPrototype;
    return extended;
  }