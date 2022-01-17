function() {

    var s = this.selection.selection,
      first = s.first,
      second = s.second;

    return {
      x1: Math.min(first.x, second.x),
      x2: Math.max(first.x, second.x),
      y1: Math.min(first.y, second.y),
      y2: Math.max(first.y, second.y)
    };
  }