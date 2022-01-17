function(icon) {
    var olist = this.olist;
    if (olist.childNodes.length > 0) {
      olist.insertBefore(icon.container, this.olist.firstChild);
    } else {
      olist.appendChild(icon.container);
    }
    this.icons[icon.descriptor.origin] = icon;
  }