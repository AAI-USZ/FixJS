function(elem, i) {
      content.push(new Expression(elem));
      if (elem.default)
        defaultKey = i;
    }