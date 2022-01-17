function compile(ast, obj) {
    for (var i = 0, elem; elem = ast[i]; i++) {
      if (elem.type == 'entity')
        obj[elem.id] = new Entity(elem);
      else if (elem.type == 'macro')
        obj[elem.id] = new Macro(elem);
    }
  }