function() {
    var ret = this.olist.lastChild;

    if (ret) {
      ret = this.icons[ret.dataset.origin];
    }

    return ret;
  }