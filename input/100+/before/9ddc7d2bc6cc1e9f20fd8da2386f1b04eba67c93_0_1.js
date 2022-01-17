function prune(p) {
    var vv = this.unwrap();
    ASSERT(!vv.isChanged(), "folding change events not supported");
    var list    = vv.value;
    var removes = [];
    var i       = list.length;
    var howMany = 0;

    /* Instead of burdening each consumer with the task of sorting the
     * removals, we guarantee that removes are in back-to-front order. */
    for (; i > 0; --i) {
      /* Filter removes items that do *not* meet the predicate. */
      if (!p(list[i - 1])) {
        ++howMany;
      } else {
        if (howMany > 0) {
          removes.push({ index: i, howMany: howMany });
          howMany = 0;
        }
      }
    }

    if (howMany > 0) {
      removes.push({ index: i, howMany: howMany });
    }

    vv.changeEvent = { removes: removes };

    runtime.touch(vv);
    
    vv.value = list.filter(p);
  }