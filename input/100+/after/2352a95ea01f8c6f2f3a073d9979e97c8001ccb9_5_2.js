function() {
        // r = rotaton, rT = r^-1
        var rT = this.getRotationTranspose();

        // T = translation, rTT = (-rT)(T)
        var rTT = rT.negate().multiplyByVector(this.getTranslation());

        // [ rT, rTT ]
        // [  0,  1  ]
        return new Matrix4(
                rT[0], rT[3], rT[6], rTT.x,
                rT[1], rT[4], rT[7], rTT.y,
                rT[2], rT[5], rT[8], rTT.z,
                  0.0,   0.0, 0.0,   1.0);
    }