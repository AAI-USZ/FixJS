function() {
        var transform = Transforms.eastNorthUpToFixedFrame(Ellipsoid.UNIT_SPHERE.cartographicDegreesToCartesian(new Cartographic2(-76.0, 40.0)));
        csc.setReferenceFrame(transform, Ellipsoid.UNIT_SPHERE);
        expect(csc.getEllipsoid()).toEqual(Ellipsoid.UNIT_SPHERE);
        expect(camera.transform.equals(transform)).toEqual(true);
    }