function(o, base, assign){
    var items, ref, temps, i, node, name, chain, logic, key, val, __ref, __len;
    items = this.items;
    if (items.length > 1) {
      __ref = base.cache(o), base = __ref[0], ref = __ref[1], temps = __ref[2];
    } else {
      ref = base;
    }
    for (i = 0, __len = items.length; i < __len; ++i) {
      node = items[i];
      if (node.comment) {
        continue;
      }
      if (node instanceof Prop || node instanceof Splat) {
        node[name = (__ref = node.children)[__ref.length - 1]] = chain = Chain(base, [Index(node[name].maybeKey())]);
      } else {
        if (logic = node.getDefault()) {
          node = node.first;
        }
        if (node instanceof Parens) {
          __ref = node.cache(o, true), key = __ref[0], node = __ref[1];
          if (assign) {
            __ref = [node, key], key = __ref[0], node = __ref[1];
          }
          key = Parens(key);
        } else {
          key = node;
        }
        val = chain = Chain(base, [Index(node.maybeKey())]);
        if (logic) {
          val = (logic.first = val, logic);
        }
        items[i] = Prop(key, val);
      }
      base = ref;
    }
    chain || this.carp('empty slice');
    if (temps) {
      (chain.head = Var(temps[0])).temp = true;
    }
    return this;
  }