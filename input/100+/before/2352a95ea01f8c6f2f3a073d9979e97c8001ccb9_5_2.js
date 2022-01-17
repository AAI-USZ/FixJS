function() {
        // r = rotaton, rT = r^-1
        var rT = this.getRotationTranspose();

        // T = translation, rTT = (-rT)(T)
        var rTT = rT.negate().multiplyByVector(this.getTranslation());

        // [ rT, rTT ]
        // [  0,  1  ]
        return new Matrix4(
                rT.getColumn0Row0(), rT.getColumn1Row0(), rT.getColumn2Row0(), rTT.x,
                rT.getColumn0Row1(), rT.getColumn1Row1(), rT.getColumn2Row1(), rTT.y,
                rT.getColumn0Row2(), rT.getColumn1Row2(), rT.getColumn2Row2(), rTT.z,
                0, 0, 0, 1);
    }