function(sphere, plane) {
        var center = sphere.center;
        var radius = sphere.radius;
        var distanceToPlane = Cartesian3.dot(plane, center) + plane.w;

        if (distanceToPlane < -radius) {
            // The center point is OUTSIDE of the frustum
            return Intersect.OUTSIDE;
        } else if (distanceToPlane < radius) {
            // The center point is within the frustum, but radius extends beyond it; partial overlap
            return Intersect.INTERSECTING;
        }
        return Intersect.INSIDE;
    }