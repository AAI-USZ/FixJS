function(node, absolute) {
  var isNode = node && (node.parentNode || node.jquery && (node = node[0]));
  if (!isNode) return this.__at(node, absolute);

  updateMarkers();

  var blockPaths = this.__blockPaths
    , pathMap = this.__pathMap
    , root = this._root
    , child, i, id, last, path, pathId, children, len;
  while (node) {
    if (node.$derbyMarkerParent && last) {
      node = last;
      while (node = node.previousSibling) {
        if (!(id = node.$derbyMarkerId)) continue;
        pathId = blockPaths[id];
        if (node.$derbyMarkerEnd || !pathId) break;

        path = pathMap.paths[pathId];
        if (isArrayPath(pathMap, root, path) && last) {
          i = 0;
          while (node = node.nextSibling) {
            if (node === last) {
              path = path + '.' + i;
              break;
            }
            i++;
          }
        }
        return this.__at(path, true);
      }
      last = last.parentNode;
      node = last.parentNode;
      continue;
    }
    if ((id = node.id) && (pathId = blockPaths[id])) {
      path = pathMap.paths[pathId];
      if (isArrayPath(pathMap, root, path) && last) {
        children = node.childNodes;
        for (i = 0, len = children.length; i < len; i++) {
          child = children[i];
          if (child === last) {
            path = path + '.' + i;
            break;
          }
        }
      }
      return this.__at(path, true);
    }
    last = node;
    node = node.parentNode;
  }

  // Just return the root scope if a path can't be found
  return root;
}