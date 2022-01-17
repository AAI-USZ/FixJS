function(line1, line2, pointName, addAngles) {
            if (line1.slope === line2.slope) {
                return false;
            }

            var point = null;

            coord = [];

            coord[0] = (line1.slope * line1.start[0]
                        - line2.slope * line2.start[0]
                        + line2.start[1] - line1.start[1]) /
                       (line1.slope - line2.slope);
            coord[1] = line1.func(coord[0]);

            point = congruency.addPoint(pointName, coord);

            point.angles.push(line1.startPt);
            point.angles.push(line1.endPt);
            point.angles.push(line2.startPt);
            point.angles.push(line2.endPt);

            if (addAngles) {
                congruency.addAngles(point.name);
            }
        }