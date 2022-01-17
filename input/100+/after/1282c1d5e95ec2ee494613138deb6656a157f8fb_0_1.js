function ArrayLiteral(node) {
    var content = [];
    var defaultKey = 0;
    node.content.forEach(function(elem, i) {
      content.push(new Expression(elem));
      if (elem.default)
        defaultKey = i;
    });
    return function(locals, env, data, key) {
      if (typeof key == 'function')
        key = key(locals, env, data);
      if (key && content[key])
        return content[key];
      return content[defaultKey];
    };
  }