function(element) {
    var name = element.getAttribute('name');
    if (!name) {
      // FIXME: Make errors more friendly.
      console.error('name attribute is required.')
      return;
    }
    var tagName = element.getAttribute('extends');
    if (!tagName) {
      // FIXME: Make it work with any element.
      // FIXME: Make errors more friendly.
      console.error('extends attribute is required.');
      return;
    }
    var constructorName = element.getAttribute('constructor');
    var declaration = new scope.Declaration(name, tagName, constructorName);
    if (constructorName) {
      window[constructorName] = declaration.element.generatedConstructor;
    }

    [].forEach.call(element.querySelectorAll('script'), declaration.evalScript,
                    declaration);
    var template = element.querySelector('template');
    template && declaration.addTemplate(template);
    this.oncreate && this.oncreate(declaration);
  }