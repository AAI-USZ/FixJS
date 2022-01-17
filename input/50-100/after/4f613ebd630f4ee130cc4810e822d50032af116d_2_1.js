function() {
      var k, stack, v;
      stack = existslib.existsSync(customDir) && apiTree.createApiTree(customDir) || {};
      for (k in internal) {
        v = internal[k];
        stack[k] = v;
      }
      return stack;
    }