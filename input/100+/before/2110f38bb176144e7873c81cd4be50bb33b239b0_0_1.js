function() {
    var args, callback, fn, id, page_id;
    page_id = arguments[0], id = arguments[1], fn = arguments[2], args = 4 <= arguments.length ? __slice.call(arguments, 3) : [];
    callback = args.pop();
    return this.getNode(page_id, id, function(node) {
      var result;
      result = node[fn].apply(node, args);
      if (result instanceof Poltergeist.ObsoleteNode) {
        return this.owner.sendError(result);
      } else {
        return callback.call(this, result, node);
      }
    });
  }