function searchForPlane(within, loc) {
  var possible_solutions = [];

  // circle throu all flights visible in viewport
  for (fid in flights) {
    var flight = flights[fid].geo;

    for (part_geo in flight.partitionedGeometries) {
      var components = flight.partitionedGeometries[part_geo].components;

      for (var i = 1, len = components.length; i < len; i++) {
        // check if the current vector between two points intersects our "within" bounds
        // if so, process this vector in the next step (possible_solutions)
        var vector = new OpenLayers.Bounds();
        vector.bottom = Math.min(components[i-1].y,
                                 components[i].y);
        vector.top =  Math.max(components[i-1].y,
                               components[i].y);
        vector.left = Math.min(components[i-1].x,
                               components[i].x);
        vector.right = Math.max(components[i-1].x,
                                 components[i].x);

        if (within.intersectsBounds(vector))
          possible_solutions.push({
            from: components[i-1].originalIndex,
            to: components[i].originalIndex,
            fid: fid
          });
      }
    }
  }

  // no solutions found. return.
  if (possible_solutions.length == 0) return null;

  // find nearest distance between loc and vectors in possible_solutions
  var nearest, distance = 99999999999;
  for (i in possible_solutions) {
    for (var j = possible_solutions[i].from + 1; j <= possible_solutions[i].to; j++) {
      var distToSegment = distanceToSegmentSquared({x: loc.lon, y: loc.lat},
        { x1: flights[possible_solutions[i].fid].geo.components[j-1].x, y1: flights[possible_solutions[i].fid].geo.components[j-1].y,
          x2: flights[possible_solutions[i].fid].geo.components[j].x, y2: flights[possible_solutions[i].fid].geo.components[j].y });

      if (distToSegment.distance < distance) {
        distance = distToSegment.distance;
        nearest = { from: j-1, to: j, along: distToSegment.along, fid: possible_solutions[i].fid};
      }
    }
  }

  return nearest;
}