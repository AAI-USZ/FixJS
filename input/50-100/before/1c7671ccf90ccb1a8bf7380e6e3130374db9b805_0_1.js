function isTileVisible(surface, sceneState, tile) {
        var boundingVolume = tile.get3DBoundingSphere();
        if (sceneState.camera.getVisibility(boundingVolume, BoundingSphere.planeSphereIntersect) === Intersect.OUTSIDE) {
            return true;
        }

        var occludeePoint = tile.getOccludeePoint();
        var occluder = surface._occluder;
        return (occludeePoint && !occluder.isVisible(new BoundingSphere(occludeePoint, 0.0))) || !occluder.isVisible(boundingVolume);
    }