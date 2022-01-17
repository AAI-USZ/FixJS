function getData(node, name) {
    var id = node[exp], store = id && data[id];
    return name === undefined ? store || setData(node) :
      (store && store[name]) || dataAttr.call($(node), name);
  }