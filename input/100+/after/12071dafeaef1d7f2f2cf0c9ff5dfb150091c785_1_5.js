function(node) {
        if (node.checked) {
          node.select(node.checked);
        }
        node.expand(true);

        if (node.value) {
          node.check(true);
        }
      }