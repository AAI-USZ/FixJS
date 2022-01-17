function(extent, ellipsoid, time, projection) {
        return new BoundingSphere(computePositions(extent, ellipsoid, time, projection));
    }