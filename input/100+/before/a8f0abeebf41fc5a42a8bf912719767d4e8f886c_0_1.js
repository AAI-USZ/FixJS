function(source, root, deep, node_callback) {
  var result = [];
  var node;
  var node_parent;
  var id;

  if (!_.isArray(source)) {
    source = _.values(source);
  }
  root = !!root ? root.toString() : null;

  for (var key=0; key < source.length; key++) {
    node = source[key];
    if (node !== undefined) {
      node_parent = !!node.parent ? node.parent.toString() : null;
      if (node_parent === root) {
        id = node._id.toString();

        if (_.isFunction(node_callback)) {
          node = node_callback(node);
        }

        if (deep > 0) {
          node.child_list = build_tree(source, id, deep-1, node_callback);
        }

        result.push(node);
        delete(source[key]);
      }
    }
  }
  // ToDo sort elements by display order
  return result;
}