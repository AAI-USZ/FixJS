function() {
        var transform = Transforms.eastNorthUpToFixedFrame(ellipsoid.cartographicDegreesToCartesian(new Cartographic2(-75.0, 40.0)));
        controller.setReferenceFrame(transform, ellipsoid);
        expect(controller.getEllipsoid()).toBe(ellipsoid);
        expect(controller._camera.transform).toBe(transform);
    }