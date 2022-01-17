function(stops, r, matrix, repeat, units, fx, fy) {

    units = units || gradient.DEFAULT_UNITS;

    fx = fx || 0;
    fy = fy || 0;

    // Default radius is 50% so diameter = 100%
    r = r == null ? '50%' : r;

    if (!tools.isArray(stops)) {

      // Assumed to be object map -- form the stops array:
      var stopsArray = [];
      for (var i in stops) {
        if (hasOwn.call(stops, i)) {
          stopsArray.push([stops[i], parseFloat(i)]);
        }
      }
      stops = stopsArray;
      stops.sort(function(a, b) {
        return a[1] - b[1];
      });
    }

    stops = stops.map(function(stop) {
      return tools.isArray(stop) ?
        [color.parse(stop[0]), stop[1]] :
        [color.parse(stop)];
    });

    gradient._fillOffsets(stops);

    if (repeat) {
      stops = gradient._repeat(stops, repeat);
    }

    return new gradient.RadialGradient(stops, r, matrix, units, fx, fy);

  }