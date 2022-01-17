function(declaration) {
    [].forEach.call(
      document.querySelectorAll(declaration.element.extendsTagName +
                                '[is=' + declaration.element.name + ']'),
      declaration.morph);
  }