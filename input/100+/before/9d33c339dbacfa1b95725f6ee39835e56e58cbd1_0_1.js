function splice(index, howMany/*...*/) {
    var vv = this.unwrap();
    var list    = vv.value;
    var removes = undefined;
    var adds    = undefined;

    if (index < 0) {
      index = ((list.length + index) >= 0) ? (list.length + index) : 0;
    }

    if ((arguments.length == 1) || (howMany > list.length - index)) {
      howMany = list.length - index;
    }

    if (howMany > 0) {
      removes = [{ index: index, howMany: howMany }];
    }

    if (arguments.length - 2 > 0) {
      adds = [{ index: index, howMany: arguments.length - 2 }]
    }

    vv.changeEvent = {
      removes: removes,
      adds:    adds
    };

    runtime.touch(vv);

    return Array.prototype.splice.apply(vv.value, arguments);
  }