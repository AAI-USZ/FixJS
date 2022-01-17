function presentValue(v) {
    var content;
    if ((ReplCore.getType(v)) === 'svg-node') {
      content = v(laz(id));
      return _svg$_present()(laz(content))(laz(id));
    } else {
      return basePresentValue(v);
    }
  }