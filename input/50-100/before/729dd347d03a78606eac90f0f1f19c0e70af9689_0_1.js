function resume () {
      var record = stack.pop();
      while (stack.length != 0 && children(record.node.nextSibling)) {
        record = stack.pop();
      }
      if (stack.length == 0) {
        done(null, record.node);
      }
    }