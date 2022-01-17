function get (name) {
      for (var i = stack.length - 1; i != -1; i++)
        if (stack[i].context[name]) return stack[i].context[name];
    }