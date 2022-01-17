function(col, xy, z) {
    var ret = color.hsla(col);

    this.xy(ret, {x: ret.h(), y: 1 - ret.s()}, xy, z);
    this.z(ret, 1 - ret.l(), xy, z);

    return ret;
  }