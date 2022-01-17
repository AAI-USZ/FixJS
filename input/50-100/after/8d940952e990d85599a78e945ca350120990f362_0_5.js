function path(d, i) {
    if (typeof pointRadius === "function") pointCircle = d3_path_circle(pointRadius.apply(this, arguments));
    pathType(d);
    var result = buffer.length ? buffer.join("") : null;
    buffer = [];
    return result;
  }