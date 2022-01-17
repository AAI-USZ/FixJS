function(o, base){
    var items, ref, i, item, splat, chain, __ref, __len;
    items = this.items;
    if (items.length > 1) {
      __ref = base.cache(o), base = __ref[0], ref = __ref[1];
    } else {
      ref = base;
    }
    for (i = 0, __len = items.length; i < __len; ++i) {
      item = items[i];
      if (splat = item instanceof Splat) {
        item = item.it;
      }
      if (item.isEmpty()) {
        continue;
      }
      chain = Chain(base, [Index(item)]);
      items[i] = splat ? Splat(chain) : chain;
      base = ref;
    }
    chain || this.carp('empty slice');
    return this;
  }