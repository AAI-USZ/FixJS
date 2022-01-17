function(point) {
            var x = point[0], y = point[1];
            return [x / xScale + xRange[0], yRange[1] - y / yScale];
        }