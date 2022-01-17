function(name, position) {
            var point = {
                name: name,
                pos: position,
                connected: [],
                arcs: []
            };

            // calculate the angle of the point to another point
            point.angleTo = function(p) {
                p = congruency.getPoint(p);

                return Math.atan2(p.pos[1] - point.pos[1],
                                  p.pos[0] - point.pos[0]);
            };

            // store the point in the congruency variable
            congruency.points[name] = point;

            return point;
        }