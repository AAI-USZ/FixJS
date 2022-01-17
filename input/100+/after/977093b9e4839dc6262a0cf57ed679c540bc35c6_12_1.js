function(position) {
        var pos = Cartesian3.clone(position);
        var n = this.geodeticSurfaceNormal(pos);
        var p = this.scaleToGeodeticSurface(pos);
        var h = position.subtract(p);
        var height = CesiumMath.sign(h.dot(pos)) * h.magnitude();
        return new Cartographic3(Math.atan2(n.y, n.x), Math.asin(n.z / n.magnitude()), height);
    }