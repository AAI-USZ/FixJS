function(box, plane) {
        var max = box.maximum;
        var min = box.minimum;
        var center = max.add(min).divideByScalar(2);
        var h = max.subtract(min).divideByScalar(2); //The positive half diagonal
        var e = h.x * Math.abs(plane.x) + h.y * Math.abs(plane.y) + h.z * Math.abs(plane.z);
        var s = center.dot(plane.getXYZ()) + plane.w; //signed distance from center
        if (s - e > 0) {
            return Intersect.INSIDE;
        }

        if (s + e < 0) {
            //Not in front because normals point inwards
            return Intersect.OUTSIDE;
        }

        return Intersect.INTERSECTING;
    }