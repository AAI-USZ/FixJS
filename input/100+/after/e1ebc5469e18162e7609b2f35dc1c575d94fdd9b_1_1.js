function splice(index, howMany/*...*/) {
    var vv = this.unwrap();
    ASSERT(!vv.isChanged(), "folding change events not supported");
    var removes, adds, list = vv.value;

    if (index < 0) {
      index = ((list.length + index) >= 0) ? (list.length + index) : 0;
    }

    if ((arguments.length === 1) || (howMany > list.length - index)) {
      howMany = list.length - index;
    }

    if (howMany > 0) {
      removes = [{ index: index, howMany: howMany }];
    }

    if (arguments.length > 2) {
      adds = [{ index: index, howMany: (arguments.length - 2) }]
    }

    vv.draft("value", {
      removes: removes,
      adds:    adds
    });

    runtime.maybeTouch(vv);

    return Array.prototype.splice.apply(vv.value, arguments);
  }