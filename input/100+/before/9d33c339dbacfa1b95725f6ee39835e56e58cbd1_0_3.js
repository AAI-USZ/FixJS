function remove(/*...*/) {
    var vv = this.unwrap();
    var removes = [];
    ASSERT(!vv.isChanged(), "folding change events not supported");

    var i;
    for (i = 0; i < arguments.length; ++i) {
      var index = vv.value.indexOf(arguments[i]);
      if (index >= 0) {
        removes.push({ index: index, howMany: 1 });
      }
    }
    
    /* Must be sorted in reverse order to be removed correctly */
    removes.sort(function(a, b) {
      return b.index - a.index;
    });

    for (i = 0; i < removes.length; ++i) {
      vv.value.splice(removes[i].index, 1);
    }

    vv.changeEvent = { removes: removes };
     
    runtime.touch(vv);
  }