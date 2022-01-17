function() {
        var ellipsoid = Ellipsoid.WGS84;
        var maxRadii = ellipsoid.getMaximumRadius();

        camera.position = Cartesian3.UNIT_X.multiplyWithScalar(2.0 * maxRadii);
        camera.direction = camera.position.negate().normalize();
        camera.up = Cartesian3.UNIT_Z;
        camera.right = camera.direction.cross(camera.up);

        var frustum = new PerspectiveFrustum();
        frustum.fovy = CesiumMath.toRadians(60.0);
        frustum.aspectRatio = canvas.clientWidth / canvas.clientHeight;
        frustum.near = 100;
        frustum.far = 60.0 * maxRadii;
        camera.frustum = frustum;

        var windowCoord = new Cartesian2(canvas.clientWidth * 0.5, canvas.clientHeight * 0.5);
        var p = camera.pickEllipsoid(windowCoord, ellipsoid);
        var c = ellipsoid.toCartographic2(p);
        expect(c.equals(new Cartographic2(0.0, 0.0))).toEqual(true);

        p = camera.pickEllipsoid(Cartesian2.ZERO, ellipsoid);
        expect(typeof p === 'undefined').toEqual(true);
    }