function (ellipsoid, origin) {
        var o = Cartesian3.clone(origin);
        var eastNorthUp = Transforms.eastNorthUpToFixedFrame(o, ellipsoid);

        this.origin = o;
        this.xAxis = Cartesian3.fromCartesian4(eastNorthUp.getColumn0());
        this.yAxis = Cartesian3.fromCartesian4(eastNorthUp.getColumn1());
        this.normal = Cartesian3.fromCartesian4(eastNorthUp.getColumn2());
        this.d = -o.dot(o);
        this.ellipsoid = ellipsoid;
    }