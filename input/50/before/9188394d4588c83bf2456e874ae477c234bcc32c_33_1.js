function createElementRef(name) {
      this[toCamelCase(name)] = document.getElementById('statusbar-' + name);
    }