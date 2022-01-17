function(extent, ellipsoid) {
        ellipsoid = defaultValue(ellipsoid, Ellipsoid.WGS84);
        var positions = computePositions(extent, ellipsoid);
        var bs = new BoundingSphere(positions);

        // TODO: get correct ellipsoid center
        var ellipsoidCenter = Cartesian3.ZERO;
        if (!ellipsoidCenter.equals(bs.center)) {
            return Occluder.getOccludeePoint(new BoundingSphere(ellipsoidCenter, ellipsoid.getMinimumRadius()), bs.center, positions);
        }
        return {
            valid : false
        };
    }