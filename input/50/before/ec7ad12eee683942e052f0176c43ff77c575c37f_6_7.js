function(icon) {
    var olist = this.olist;
    if (olist.childNodes.length > 0) {
      olist.insertBefore(icon.container, olist.firstChild);
    }
  }