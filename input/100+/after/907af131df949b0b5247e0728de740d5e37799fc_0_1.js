function Parser_convertToCallTree(samples, isReverse) {
    var treeRoot = null;
    for (var i = 0; i < samples.length; ++i) {
      var sample = samples[i];
      var callstack = sample.frames.clone();
      if (callstack[i] == "(root)") {
        if (isReverse == true) {
          callstack[i] = "(Program start)";
        } else {
          callstack[i] = "(Top frame)";
        }
      }
      if (isReverse == true) callstack = callstack.reverse();
      if (!treeRoot) {
        treeRoot = new TreeNode(callstack[0], null);
        treeRoot.totalSamples = samples.length;
        var node = treeRoot;
        for (var j = 1; j < callstack.length; ++j) {
          if (callstack[j] == "(root)") {
            if (isReverse == true) {
              callstack[j] = "(Program start)";
            } else {
              callstack[j] = "(Top frame)";
            }
          }
          var frame = callstack[j];
          var child = new TreeNode(frame, node);
          child.totalSamples = samples.length;
          node.children.push(child);
          node = child;
        }
      } else {
        var newChild = treeRoot.followPath(callstack.slice(1));
        if (newChild.name == callstack[callstack.length - 1]) {
          // we found the exact node, so let's just increment
          // the counters through the parent chain.
          var node = newChild;
          while (node) {
            node.counter++;
            node = node.parent;
          }
        } else {
          var depth = newChild.depth + 1;
          var remainingCallstack = callstack.slice(depth);
          var node = newChild;
          while (node) {
            node.counter++;
            node = node.parent;
          }
          node = newChild;
          for (var j = 0; j < remainingCallstack.length; ++j) {
            if (remainingCallstack[j] == "(root)") {
              if (isReverse == true) {
                remainingCallstack[j] = "(Program start)";
              } else {
                remainingCallstack[j] = "(Top frame)";
              }
            }
            var frame = remainingCallstack[j];
            var child = new TreeNode(frame, node);
            child.totalSamples = samples.length;
            node.children.push(child);
            node = child;
          }
        }
      }
    }
    if (treeRoot == null)
      dump("no tree root\n");
    return treeRoot;
  }