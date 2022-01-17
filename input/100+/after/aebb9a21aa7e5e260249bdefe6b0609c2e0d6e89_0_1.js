function (stack, id) {
    if (typeof(id) !== "object")
      return id;
    if (id.length === 2 && id[0] === 0 && (id[1] in helpers))
      return helpers[id[1]]; // found helper
    for (var i = 0; i < id[0]; i++) {
      if (!stack.parent)
        throw new Error("Too many '..' segments");
      else
        stack = stack.parent;
    }
    var ret = stack.data;
    if (id.length > 1 && typeof ret !== 'object') {
      // Fail with better error than "can't read property of undefined".
      // Looking up id[1] as a property will fail, because
      // there is no data context object.  Probably the developer
      // intended to use a helper that doesn't exist.
      if (typeof (function() {})[id[1]] !== 'undefined') {
        // An even more specific case for a helpful error.
        // The developer probably tried to name a helper 'name',
        // 'length', or some other built-in function property.
        // Assignments to these properties are no-ops, so the
        // helper declaration is undetectable.
        // We can't always catch this mistake, because if there is any
        // object as data context, it's legal for the developer to
        // ask for {{name}} as a property of the object, perhaps an
        // optional one.  But if there is no data context, we get
        // to be helpful.
        throw new Error("Can't call a helper '"+id[1]+"' because "+
                        "it is a built-in function property in JavaScript");
      }
      throw new Error("Unknown helper '"+id[1]+"'");
    }
    for (var i = 1; i < id.length; i++)
      // XXX error (and/or unknown key) handling
      ret = ret[id[i]];
    return ret;
  }