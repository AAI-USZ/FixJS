function(node, index) {
        var depth = compute(node.expression, index);

        node.resultIndex   = index.result;
        node.resultIndices = range(depth.result + 1);
        node.posIndices    = range(depth.pos);
      }