function() {
        var transform = Transforms.eastNorthUpToFixedFrame(Ellipsoid.UNIT_SPHERE.cartographicToCartesian(Cartographic.fromDegrees(-76.0, 40.0)));
        csc.setReferenceFrame(transform, Ellipsoid.UNIT_SPHERE);
        expect(csc.getEllipsoid()).toEqual(Ellipsoid.UNIT_SPHERE);
        expect(camera.transform.equals(transform)).toEqual(true);
    }