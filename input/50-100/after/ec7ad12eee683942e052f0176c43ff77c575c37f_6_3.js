function pg_prependIcon(icon) {
    this.setReady(false);
    var olist = this.olist;
    if (olist.children.length > 0) {
      olist.insertBefore(icon.container, olist.firstChild);
    } else {
      olist.appendChild(icon.container);
    }
    this.setReady(true);
    this.icons[icon.descriptor.origin] = icon;
  }