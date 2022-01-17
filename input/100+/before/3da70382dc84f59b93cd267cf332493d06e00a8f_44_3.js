function(sceneState, maxLat, maxGivenLat, viewProjMatrix, viewportTransformation) {
        var pt1 = this._ellipsoid.toCartesian(new Cartographic2(0.0, maxGivenLat));
        var pt2 = this._ellipsoid.toCartesian(new Cartographic2(Math.PI, maxGivenLat));
        var radius = pt1.subtract(pt2).magnitude() * 0.5;

        var center = this._ellipsoid.toCartesian(new Cartographic2(0.0, maxLat));

        var right;
        var dir = sceneState.camera.direction;
        if (1.0 - Cartesian3.UNIT_Z.negate().dot(dir) < CesiumMath.EPSILON6) {
            right = Cartesian3.UNIT_X;
        } else {
            right = dir.cross(Cartesian3.UNIT_Z).normalize();
        }

        var screenRight = center.add(right.multiplyWithScalar(radius));
        var screenUp = center.add(Cartesian3.UNIT_Z.cross(right).normalize().multiplyWithScalar(radius));

        center = Transforms.pointToWindowCoordinates(viewProjMatrix, viewportTransformation, center);
        screenRight = Transforms.pointToWindowCoordinates(viewProjMatrix, viewportTransformation, screenRight);
        screenUp = Transforms.pointToWindowCoordinates(viewProjMatrix, viewportTransformation, screenUp);

        var halfWidth = Math.floor(Math.max(screenUp.subtract(center).magnitude(), screenRight.subtract(center).magnitude()));
        var halfHeight = halfWidth;

        return new Rectangle(
                Math.floor(center.x) - halfWidth,
                Math.floor(center.y) - halfHeight,
                halfWidth * 2.0,
                halfHeight * 2.0);
    }