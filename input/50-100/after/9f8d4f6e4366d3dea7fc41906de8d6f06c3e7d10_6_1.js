function presentValue(v) {
    var content;
    if ((ReplCore.getType(v)) === 'svgNode') {
      content = v(laz(id));
      return _svgPresent()(laz(content))(laz(id));
    } else {
      return basePresentValue(v);
    }
  }