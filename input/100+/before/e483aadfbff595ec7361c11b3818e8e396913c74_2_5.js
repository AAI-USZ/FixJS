function(selector, context){
      var node = this[0], candidates = $$(context || document, selector);
      if (!candidates.length) node = null;
      while (node && candidates.indexOf(node) < 0)
        node = node !== context && node !== document && node.parentNode;
      return $(node);
    }