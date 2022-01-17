function(extent, ellipsoid) {
        return new BoundingSphere(computePositions(extent, ellipsoid));
    }