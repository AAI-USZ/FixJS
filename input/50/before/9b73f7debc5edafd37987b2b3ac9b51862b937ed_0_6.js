function(declaration) {
    [].forEach.call(document.querySelectorAll(
        declaration.element.extends + '[is=' + declaration.element.name +
        ']'), declaration.morph);
  }