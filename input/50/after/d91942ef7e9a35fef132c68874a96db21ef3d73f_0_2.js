function(y) {
                var slope = (line.slope === 0) ? 0.00001 : line.slope
                return line.start[0] + (y - line.start[1]) / slope;
            }