function(vector) {
        var vX = vector.x;
        var vY = vector.y;
        var vZ = vector.z;

        var x = this.getColumnMajorValue(0) * vX +
                this.getColumnMajorValue(3) * vY +
                this.getColumnMajorValue(6) * vZ;

        var y = this.getColumnMajorValue(1) * vX +
                this.getColumnMajorValue(4) * vY +
                this.getColumnMajorValue(7) * vZ;

        var z = this.getColumnMajorValue(2) * vX +
                this.getColumnMajorValue(5) * vY +
                this.getColumnMajorValue(8) * vZ;

        return new Cartesian3(x, y, z);
    }