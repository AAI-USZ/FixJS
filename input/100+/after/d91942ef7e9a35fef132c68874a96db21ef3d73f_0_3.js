function(point, options) {
            var pt = congruency.getPoint(point);

            // sort the angles that are coming out of
            // the given point by the angle they make to the point
            var sortConnected = _.sortBy(pt.connected, function(cpt) {
                return pt.angleTo(cpt);
            });

            var numAngs = sortConnected.length;

            // go through the connected points in order and add
            // the angles between them
            for (var i = 0; i < numAngs; i += 1) {
                var pt1 = sortConnected[i];
                var pt2 = sortConnected[(i + 1) % numAngs];

                var ang1 = pt.angleTo(pt1);
                var ang2 = pt.angleTo(pt2);

                // make sure the last angle is correct
                if (i + 1 === numAngs) {
                    ang2 += Math.PI * 2;
                }

                // don't make angles that are more than 180
                if (ang2 - ang1 >= Math.PI) {
                    continue;
                }

                // add the angle
                congruency.addAngle(pt.name, pt1.name, pt2.name, options);
            }
        }