function(point, options) {
            var pt = congruency.getPoint(point);

            // sort the angles that are coming out of
            // the given point by the angle they make to the point
            var sortAngs = _.sortBy(pt.angles, function(ang) {
                return pt.angleTo(ang);
            });

            var numAngs = sortAngs.length;

            // go through the angles in order and add the angles
            for (var i = 0; i < numAngs; i += 1) {
                var pt1 = sortAngs[i];
                var pt2 = sortAngs[(i + 1) % numAngs];

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