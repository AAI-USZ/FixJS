function(element) {
    // FIXME: We shouldn't be updating __proto__ like this on each morph.
    this.element.generatedConstructor.prototype.__proto__ = document.createElement(this.element.extendsTagName);
    element.__proto__ = this.element.generatedConstructor.prototype;
    var shadowRoot = this.createShadowRoot(element);

    // Fire created event.
    this.created && this.created.call(element, shadowRoot);
    this.inserted && this.inserted.call(element, shadowRoot);

    // Setup mutation observer for attribute changes.
    if (this.attributeChanged) {
      var observer = new WebKitMutationObserver(function(mutations) {
        mutations.forEach(function(m) {
          this.attributeChanged(m.attributeName, m.oldValue,
                                m.target.getAttribute(m.attributeName));
        }.bind(this));
      }.bind(this));

      // TOOD: spec isn't clear if it's changes to the custom attribute
      // or any attribute in the subtree.
      observer.observe(shadowRoot.host, {
        attributes: true,
        attributeOldValue: true
      });
    }
  }