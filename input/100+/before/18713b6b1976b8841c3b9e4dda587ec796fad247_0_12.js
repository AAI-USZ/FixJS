function clip(coordinates) {
    var i = -1,
        n = coordinates.length,
        clipped = [],
        p0,
        p1,
        p2,
        d0,
        d1;

    while (++i < n) {
      d1 = arc.distance(p2 = coordinates[i]);
      if (d1 < radians) {
        if (p1) clipped.push(d3_geo_greatArcInterpolate(p1, p2)((d0 - radians) / (d0 - d1)));
        clipped.push(p2);
        p0 = p1 = null;
      } else {
        p1 = p2;
        if (!p0 && clipped.length) {
          clipped.push(d3_geo_greatArcInterpolate(clipped[clipped.length - 1], p1)((radians - d0) / (d1 - d0)));
          p0 = p1;
        }
      }
      d0 = d1;
    }

    if (p1 && clipped.length) {
      d1 = arc.distance(p2 = clipped[0]);
      clipped.push(d3_geo_greatArcInterpolate(p1, p2)((d0 - radians) / (d0 - d1)));
    }

    return resample(clipped);
  }