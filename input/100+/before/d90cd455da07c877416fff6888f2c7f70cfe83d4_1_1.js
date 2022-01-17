function digIn(state, node) {
  if (node.tagStr && state.has(node.tagStr) && !state.has(node.tagStr, null)) {
    var cases = node.cases.map(function(branch) {
          return [utils.stringify(branch[0]), branch[1]];
        }),
        result;

    cases.some(function(branch) {
      if (state.has(node.tagStr, branch[0])) {
        result = branch[1];
        return true;
      }
      return false;
    });

    if (!result) result = node['default'];

    return result.state.isReachable() ?
        digIn(state, result || node['default'])
        :
        node;
  } else {
    return node;
  }
}