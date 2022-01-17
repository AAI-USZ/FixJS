function vennIntersectionString(points, circles, sweeps, outer) {
        var pathString = "M" + scaleAndJoin(points[0]);
        $.each(points, function(i, point) {
            var c = circles[(i+0) % circles.length];
            var largeAngle = pointsAreOnSameSideOfLine([points[i], points[(i+1) % points.length]],[[c.x, c.y], points[(i+2) % points.length]]) && outer && sweeps[i];
            largeAngle = false;
            pathString += arcString (points[(i+1) % points.length], circles[i].r, largeAngle, sweeps[i]);
        });
        return pathString;
    }