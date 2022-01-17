function(position) {
        var pos = Cartesian3.clone(position);
        var p = this.scaleToGeodeticSurface(pos);
        var h = position.subtract(p);
        var height = CesiumMath.sign(h.dot(pos)) * h.magnitude();
        var c = this.toCartographic2(p);
        return new Cartographic3(c.longitude, c.latitude, height);
    }