function remove(/*...*/) {
    var vv = this.unwrap();
    ASSERT(!vv.isChanged(), "folding change events not supported");
    var list    = vv.value;
    var removes = [];
    var howMany = 0;
    var i = list.length;
    //var j;
    
    for (; i > 0; --i) {
      if (Array.prototype.indexOf.call(arguments, list[i - 1]) >= 0) {
        ++howMany;
      } else {
        removes.push({ index: i, howMany: howMany });
        howMany = 0;
      }
    }
    
    if (howMany > 0) {
      removes.push({ index: i, howMany: howMany });
    }
    
    /* Must be sorted in reverse order to be removed correctly */
    removes.sort(function(a, b) {
      return b.index - a.index;
    });

    vv.changeEvent = { removes: removes };
     
    runtime.touch(vv);
    
    var removed = [];
    for (i = 0; i < removes.length; ++i) {
      Array.prototype.push.apply(removed, 
        list.splice(removes[i].index, removes[i].howMany));
    }
    return removed;
  }