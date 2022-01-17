function(extent, ellipsoid) {
        return new BoundingSphere(Extent._computePositions(extent, ellipsoid));
    }