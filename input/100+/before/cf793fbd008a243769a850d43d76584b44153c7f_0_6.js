function(params, node, bound, curried){
    var node, fun, args, index, a, __len;
    fun = Fun(params, void 8, bound, curried);
    if (fun['void'] = node.op === '!') {
      node = node.it;
    }
    if (node instanceof Label) {
      fun.name = node.label;
      fun.labeled = true;
      node = node.it;
    }
    if (!fun['void'] && (fun['void'] = node.op === '!')) {
      node = node.it;
    }
    args = (node.getCall() || (node = Chain(node).add(Call())).getCall()).args;
    for (index = 0, __len = args.length; index < __len; ++index) {
      a = args[index];
      if (a.filler) {
        break;
      }
    }
    return node.back = (args[index] = fun).body, node;
  }