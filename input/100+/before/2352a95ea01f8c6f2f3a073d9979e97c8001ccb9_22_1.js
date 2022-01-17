function() {
        var sPiOver4 = Math.sin(CesiumMath.PI_OVER_FOUR);
        var cPiOver4 = Math.cos(CesiumMath.PI_OVER_FOUR);
        var sPiOver2 = Math.sin(CesiumMath.PI_OVER_TWO);
        var cPiOver2 = Math.cos(CesiumMath.PI_OVER_TWO);
        var q = new Quaternion(new Cartesian3(0.0, 0.0, 1.0).multiplyByScalar(sPiOver4), cPiOver4);
        var rotation = new Matrix3(cPiOver2, -sPiOver2, 0.0,
                                   sPiOver2,  cPiOver2, 0.0,
                                        0.0,       0.0, 1.0);
        expect(q.toRotationMatrix().equalsEpsilon(rotation, CesiumMath.EPSILON15)).toEqual(true);
    }