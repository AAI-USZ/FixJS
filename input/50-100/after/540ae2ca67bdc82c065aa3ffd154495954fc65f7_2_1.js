function(iface, scan) {
    var _ref;
    if (scan == null) {
      scan = true;
    }
    return {
      "interface": (_ref = iface != null ? iface : this.DEFAULT_INTERFACE) != null ? _ref : 'mon0',
      scan: scan,
      ignoreFCS: true
    };
  }