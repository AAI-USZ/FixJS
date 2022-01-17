function(c) {
    if (Luca.isComponentPrototype(c)) console.log('Prototype');
    if (Luca.isComponent(c)) return console.log('Component');
  }