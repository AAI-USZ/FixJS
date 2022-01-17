function(ellipsoid, west, south, east, north) {
        //
        // Ensure we go from -180 to 180
        //
        west = CesiumMath.negativePiToPi(west);
        east = CesiumMath.negativePiToPi(east);

        // If we go across the International Date Line
        if (west > east) {
            east += CesiumMath.TWO_PI;
        }

        var lla = new Cartographic(0.5 * (west + east), 0.5 * (north + south), 0.0);
        var northVector = ellipsoid.cartographicToCartesian(new Cartographic(lla.longitude, north, 0.0));
        var eastVector = ellipsoid.cartographicToCartesian(new Cartographic(east, lla.latitude, 0.0));
        var centerVector = ellipsoid.cartographicToCartesian(lla);
        var invTanHalfPerspectiveAngle = 1.0 / Math.tan(0.5 * this.frustum.fovy);
        var screenViewDistanceX;
        var screenViewDistanceY;
        var tempVec;
        if (this._canvas.clientWidth >= this._canvas.clientHeight) {
            tempVec = eastVector.subtract(centerVector);
            screenViewDistanceX = Math.sqrt(tempVec.dot(tempVec) * invTanHalfPerspectiveAngle);
            tempVec = northVector.subtract(centerVector);
            screenViewDistanceY = Math.sqrt(tempVec.dot(tempVec) * invTanHalfPerspectiveAngle * this._canvas.clientWidth / this._canvas.clientHeight);
        } else {
            tempVec = eastVector.subtract(centerVector);
            screenViewDistanceX = Math.sqrt(tempVec.dot(tempVec) * invTanHalfPerspectiveAngle * this._canvas.clientWidth / this._canvas.clientHeight);
            tempVec = northVector.subtract(centerVector);
            screenViewDistanceY = Math.sqrt(tempVec.dot(tempVec) * invTanHalfPerspectiveAngle);
        }
        lla.height += Math.max(screenViewDistanceX, screenViewDistanceY);

        this.position = ellipsoid.cartographicToCartesian(lla);
        this.direction = Cartesian3.ZERO.subtract(centerVector).normalize();
        this.right = this.direction.cross(Cartesian3.UNIT_Z).normalize();
        this.up = this.right.cross(this.direction);
    }