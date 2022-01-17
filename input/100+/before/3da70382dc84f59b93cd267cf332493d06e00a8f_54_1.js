function() {
        var ellipsoid = new Ellipsoid(new Cartesian3(1, 1, 0.7));

        expect(Cartesian3.UNIT_X.equalsEpsilon(ellipsoid.toCartesian(new Cartographic2(0, 0)), CesiumMath.EPSILON10)).toEqual(true);

        expect(Cartesian3.UNIT_Y.equalsEpsilon(ellipsoid.toCartesian(new Cartographic2(CesiumMath.toRadians(90), 0)), CesiumMath.EPSILON10)).toEqual(true);

        expect(new Cartesian3(0, 0, 0.7).equalsEpsilon(ellipsoid.toCartesian(new Cartographic2(0, CesiumMath.toRadians(90))), CesiumMath.EPSILON10)).toEqual(true);
    }