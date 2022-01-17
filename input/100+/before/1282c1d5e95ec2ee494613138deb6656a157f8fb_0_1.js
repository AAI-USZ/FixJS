function ArrayLiteral(node) {
    var content = [];
    var defaultIndex = 0;
    node.content.forEach(function(elem, i) {
      content.push(new Expression(elem));
      if (elem.default)
        defaultIndex = i;
    });
    return function(locals, env, data, index) {
      var i = index.shift();
      if (typeof i == 'function')
        i = i(locals, env, data);
      try {
        return content[i](locals, env, data, index);
      } catch (e) {
        return content[defaultIndex](locals, env, data, index);
      }
    };
  }