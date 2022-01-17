function(val){
    if (0 == arguments.length) return el;
    el.empty().append(val.el || val);
    return this;
  }