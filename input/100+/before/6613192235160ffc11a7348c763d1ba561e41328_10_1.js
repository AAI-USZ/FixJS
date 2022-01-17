function(directions, radius) {
        var length = directions.length;
        var positions = new Float32Array(3 * length);
        var r = isFinite(radius) ? radius : FAR;

        for ( var i = length - 2, j = length - 1, k = 0; k < length; i = j++, j = k++) {
            // PERFORMANCE_IDEA:  We can avoid redundant operations for adjacent edges.
            var n0 = CustomSensorVolume._toCartesian(directions[i]);
            var n1 = CustomSensorVolume._toCartesian(directions[j]);
            var n2 = CustomSensorVolume._toCartesian(directions[k]);

            // Extend position so the volume encompasses the sensor's radius.
            var theta = Math.max(CesiumMath.angleBetween(n0, n1), CesiumMath.angleBetween(n1, n2));
            var distance = r / Math.cos(theta * 0.5);
            var p = n1.multiplyWithScalar(distance);

            positions[(j * 3) + 0] = p.x;
            positions[(j * 3) + 1] = p.y;
            positions[(j * 3) + 2] = p.z;
        }

        return positions;
    }