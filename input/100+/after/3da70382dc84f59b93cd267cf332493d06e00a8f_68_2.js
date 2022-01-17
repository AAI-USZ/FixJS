function() {
        var ellipsoid = Ellipsoid.WGS84;
        var projection = new EquidistantCylindricalProjection(ellipsoid);
        var maxRadii = ellipsoid.getMaximumRadius();

        camera.position = new Cartesian3(0.0, 0.0, 2.0 * maxRadii);
        camera.direction = camera.position.negate().normalize();
        camera.up = Cartesian3.UNIT_Y;

        var frustum = new OrthographicFrustum();
        frustum.right = maxRadii * Math.PI;
        frustum.left = -frustum.right;
        frustum.top = frustum.right * (canvas.clientHeight / canvas.clientWidth);
        frustum.bottom = -frustum.top;
        frustum.near = 0.01 * maxRadii;
        frustum.far = 60.0 * maxRadii;
        camera.frustum = frustum;

        var windowCoord = new Cartesian2(canvas.clientWidth * 0.5, canvas.clientHeight * 0.5);
        var p = camera.pickMap2D(windowCoord, projection);
        var c = ellipsoid.cartesianToCartographic(p);
        expect(c.equals(new Cartographic(0.0, 0.0, 0.0))).toEqual(true);

        p = camera.pickMap2D(Cartesian2.ZERO, projection);
        expect(typeof p === 'undefined').toEqual(true);
    }