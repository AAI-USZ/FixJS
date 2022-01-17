function traverseGlobals(node) {
    if (!Array.isArray(node)) return node;

    if (node[0] === 'function') return node;

    if (node[0] === 'member' &&
        node[1][0] === 'name' && node[1][1] === 'global' &&
        node[2][0] === 'name' &&
        !lookup(node[2][1])) {
      return node[2];
    }
    return node.map(traverseLocals);
  }