function() {
        var ellipsoid = Ellipsoid.WGS84;
        var p = ellipsoid.cartographicToCartesian(Cartographic.ZERO);

        var tangentPlane = EllipsoidTangentPlane.create(ellipsoid, [p]);
        var projectedP = tangentPlane.projectPointsOntoPlane([p]);

        expect(projectedP.length).toEqual(1);
        expect(projectedP[0].equals(Cartesian2.ZERO)).toEqual(true);
    }