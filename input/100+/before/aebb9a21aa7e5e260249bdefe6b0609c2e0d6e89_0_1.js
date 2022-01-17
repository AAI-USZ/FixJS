function (stack, id) {
    if (typeof(id) !== "object")
      return id;
    if (id.length === 2 && id[0] === 0 && (id[1] in helpers))
      return helpers[id[1]];
    for (var i = 0; i < id[0]; i++) {
      if (!stack.parent)
        throw new Error("Too many '..' segments");
      else
        stack = stack.parent;
    }
    var ret = stack.data;
    for (var i = 1; i < id.length; i++)
      // XXX error (and/or unknown key) handling
      ret = ret[id[i]];
    return ret;
  }