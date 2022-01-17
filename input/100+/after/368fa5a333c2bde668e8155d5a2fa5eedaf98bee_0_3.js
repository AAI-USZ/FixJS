function vennIntersectionString(points, circles, sweeps) {
        var pathString = "M" + scaleAndJoin(points[0]);
        $.each(points, function(i, point) {
            var c = circles[(i+0) % circles.length];
            var largeAngle = !pointIsOnSideOfLineWithCenter([points[i], points[(i+1) % points.length]],[c.x, c.y]) && !sweeps[i];
            pathString += arcString (points[(i+1) % points.length], circles[i].r, largeAngle, sweeps[i]);
        });
        return pathString;
    }