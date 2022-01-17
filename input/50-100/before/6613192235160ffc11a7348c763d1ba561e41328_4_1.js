function (ellipsoid, origin) {
        var o = Cartesian3.clone(origin);
        var eastNorthUp = Transforms.eastNorthUpToFixedFrame(o, ellipsoid);

        this.origin = o;
        this.xAxis = eastNorthUp.getColumn0().getXYZ();
        this.yAxis = eastNorthUp.getColumn1().getXYZ();
        this.normal = eastNorthUp.getColumn2().getXYZ();
        this.d = -o.dot(o);
        this.ellipsoid = ellipsoid;
    }