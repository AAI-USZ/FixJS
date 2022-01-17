function() {
        expect(Cartesian3.UNIT_X.equalsEpsilon(Ellipsoid.UNIT_SPHERE.geodeticSurfaceNormalc(Cartographic3.ZERO), CesiumMath.EPSILON10)).toEqual(true);
        expect(Cartesian3.UNIT_Z.equalsEpsilon(Ellipsoid.UNIT_SPHERE.geodeticSurfaceNormalc(new Cartographic3(0, CesiumMath.PI_OVER_TWO, 0)), CesiumMath.EPSILON10)).toEqual(true);
    }