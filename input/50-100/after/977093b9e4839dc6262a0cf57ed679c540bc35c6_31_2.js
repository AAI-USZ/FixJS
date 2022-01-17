function() {
        expect(CesiumMath.convertLongitudeRange(CesiumMath.THREE_PI_OVER_TWO)).toEqualEpsilon(-CesiumMath.PI_OVER_TWO, CesiumMath.EPSILON16);
    }