function(node, index) {
        var depth;

        node.expression.resultIndex = node.resultIndex;

        depth = compute(node.expression, index);

        node.resultIndices = range(depth.result + 1);
        node.posIndices    = range(depth.pos);
      }