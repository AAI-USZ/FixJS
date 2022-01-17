function setData(node, name, value) {
    var id = node[exp] || (node[exp] = ++uuid),
      store = data[id] || (data[id] = {});
    if (name !== undefined) store[name] = value;
    return store;
  }