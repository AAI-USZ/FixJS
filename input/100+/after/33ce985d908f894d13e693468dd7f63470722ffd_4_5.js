function screenSpaceError(surface, context, sceneState, tile) {
        var maxGeometricError = surface._tilingScheme.getLevelMaximumGeometricError(tile.level);

        var boundingVolume = tile.get3DBoundingSphere();
        var camera = sceneState.camera;
        var cameraPosition = camera.getPositionWC();
        if (!surface._doLodUpdate) {
            cameraPosition = surface._frozenLodCameraPosition;
        }

        var toCenter = boundingVolume.center.subtract(cameraPosition);
        var distanceToBoundingSphere = toCenter.magnitude() - boundingVolume.radius;

        var ellipsoid = surface.terrainProvider.tilingScheme.ellipsoid;
        var heightAboveEllipsoid = ellipsoid.cartesianToCartographic(cameraPosition).height;
        var distanceToTerrainHeight = heightAboveEllipsoid - tile.maxHeight;

        var distance;
        if (typeof distanceToBoundingSphere !== 'undefined' && distanceToBoundingSphere > 0.0 && typeof distanceToTerrainHeight !== 'undefined' && distanceToTerrainHeight > 0.0) {
            distance = Math.max(distanceToBoundingSphere, distanceToTerrainHeight);
        } else if (typeof distanceToBoundingSphere !== 'undefined' && distanceToBoundingSphere > 0.0) {
            distance = distanceToBoundingSphere;
        } else if (typeof distanceToTerrainHeight !== 'undefined' && distanceToTerrainHeight > 0.0) {
            distance = distanceToTerrainHeight;
        } else {
            // The camera is inside the bounding sphere and below the maximum terrain height,
            // so the screen-space error could be enormous, but we don't really have any way
            // to calculate it.  So return positive infinity, which will force a refine.
            tile.cameraInsideBoundingSphere = true;
            return 1.0/0.0;
        }

        tile.cameraInsideBoundingSphere = false;

        var viewport = context.getViewport();
        var viewportHeight = viewport.height;

        var frustum = camera.frustum;
        var fovy = frustum.fovy;

        // PERFORMANCE_TODO: factor out stuff that's constant across tiles.
        return (maxGeometricError * viewportHeight) / (2 * distance * Math.tan(0.5 * fovy));
    }