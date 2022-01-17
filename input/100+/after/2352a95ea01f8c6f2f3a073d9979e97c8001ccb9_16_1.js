function(sceneState) {
        var radii = this._ellipsoid.getRadii();
        var p = sceneState.camera.getPositionWC();

        // Find the corresponding position in the scaled space of the ellipsoid.
        var q = this._ellipsoid.getOneOverRadii().multiplyComponents(p);

        var qMagnitude = q.magnitude();
        var qUnit = q.normalize();

        // Determine the east and north directions at q.
        var eUnit = Cartesian3.UNIT_Z.cross(q).normalize();
        var nUnit = qUnit.cross(eUnit).normalize();

        // Determine the radius of the 'limb' of the ellipsoid.
        var wMagnitude = Math.sqrt(q.magnitudeSquared() - 1.0);

        // Compute the center and offsets.
        var center = qUnit.multiplyByScalar(1.0 / qMagnitude);
        var scalar = wMagnitude / qMagnitude;
        var eastOffset = eUnit.multiplyByScalar(scalar);
        var northOffset = nUnit.multiplyByScalar(scalar);

        // A conservative measure for the longitudes would be to use the min/max longitudes of the bounding frustum.
        var upperLeft = radii.multiplyComponents(center.add(northOffset).subtract(eastOffset));
        var upperRight = radii.multiplyComponents(center.add(northOffset).add(eastOffset));
        var lowerLeft = radii.multiplyComponents(center.subtract(northOffset).subtract(eastOffset));
        var lowerRight = radii.multiplyComponents(center.subtract(northOffset).add(eastOffset));
        return [upperLeft.x, upperLeft.y, upperLeft.z, lowerLeft.x, lowerLeft.y, lowerLeft.z, upperRight.x, upperRight.y, upperRight.z, lowerRight.x, lowerRight.y, lowerRight.z];
    }