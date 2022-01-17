function screenSpaceError(surface, context, sceneState, tile) {
        var maxGeometricError = surface._tilingScheme.getLevelMaximumGeometricError(tile.level);

        var boundingVolume = tile.get3DBoundingSphere();
        var camera = sceneState.camera;
        var cameraPosition = camera.getPositionWC();

        var toCenter = boundingVolume.center.subtract(cameraPosition);
        var distance = toCenter.magnitude() - boundingVolume.radius;

        if (distance < 0.0) {
            // We're inside the bounding sphere, so the screen-space error could be enormous, but
            // we don't really have any way to calculate it.  So return positive infinity, which will
            // force a refine.
            return 1.0/0.0;
        }

        var viewport = context.getViewport();
        var viewportHeight = viewport.height;

        var frustum = camera.frustum;
        var fovy = frustum.fovy;

        // PERFORMANCE_TODO: factor out stuff that's constant across tiles.
        return (maxGeometricError * viewportHeight) / (2 * distance * Math.tan(0.5 * fovy));
    }