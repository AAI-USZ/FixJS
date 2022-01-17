function(val){
    if (0 == arguments.length) return el;
    el.empty().append((val && val.el) ? val.el : val);
    return this;
  }