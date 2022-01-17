function performSearch(search) {
  var result = [];

  // don't do a tree search
  if (search.filled) {
    var nodeList = search.nodeList;
    var i = 0, l = nodeList.length;
    var elem;

    // search only until first element
    if (search.first) {
      for (; i < l; i++) {
        elem = nodeList[i];
        if (doPass(search, elem)) {
          result.push(elem);
          break;
        }
      }

      return result;
    }

    // search all elements
    for (; i < l; i++) {
      elem = nodeList[i];
      if (doPass(search, elem)) {
        result.push(elem);
      }
    }

    return result;
  }

  // deep search the tree
  if (search.first) {
    var elem = searchOneChild(search, search.tree);
    if (elem) result.push(elem);
    return result;
  }

  searchChildrens(search, search.tree, result);
  return result;
}