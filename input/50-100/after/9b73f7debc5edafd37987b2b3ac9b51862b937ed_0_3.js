function(element) {
    if (!this.template) {
      return undefined;
    }

    var shadowRoot = new WebKitShadowRoot(element);
    shadowRoot.host = element;
    [].forEach.call(this.template.childNodes, function(node) {
      shadowRoot.appendChild(node.cloneNode(true));
    });

    return shadowRoot;
  }