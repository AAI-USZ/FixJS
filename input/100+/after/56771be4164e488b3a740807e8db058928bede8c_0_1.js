function handleZoom(object, movement, distanceMeasure) {
        // distanceMeasure should be the height above the ellipsoid.
        // The zoomRate slows as it approaches the surface and stops 20m above it.
        var maxHeight = 20.0;
        var zoomRate = object._zoomFactor * (distanceMeasure - maxHeight);

        if (zoomRate > object._maximumZoomRate) {
            zoomRate = object._maximumZoomRate;
        }

        var diff = movement.endPosition.y - movement.startPosition.y;
        if (diff === 0) {
            return;
        }

        var rangeWindowRatio = diff / object._canvas.clientHeight;
        var dist = zoomRate * rangeWindowRatio;

        if (dist > 0.0 && Math.abs(distanceMeasure - maxHeight) < 1.0) {
            return;
        }

        if (distanceMeasure - dist < maxHeight) {
            dist = distanceMeasure - maxHeight - 1.0;
        }

        if (dist > 0.0) {
            object.zoomIn(dist);
        } else {
            object.zoomOut(-dist);
        }
    }