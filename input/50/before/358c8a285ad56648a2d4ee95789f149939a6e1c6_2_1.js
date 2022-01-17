function(extent, ellipsoid, time, projection) {
        return new BoundingSphere(Extent._computePositions(extent, ellipsoid, time, projection));
    }