function() {
        var ellipsoid = Ellipsoid.WGS84;
        var p = ellipsoid.toCartesian(Cartographic3.ZERO);
        var tangentPlane = EllipsoidTangentPlane.create(ellipsoid, [p]);

        expect(function() {
            return tangentPlane.projectPointsOntoPlane();
        }).toThrow();
    }