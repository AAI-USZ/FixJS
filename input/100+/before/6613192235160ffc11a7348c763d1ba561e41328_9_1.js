function(description) {
        var quad = description.quad;
        var upperLeft = new Cartesian3(quad[0], quad[1], quad[2]);
        var lowerRight = new Cartesian3(quad[9], quad[10], quad[11]);
        var mvp = description.modelViewProjection;
        var clip = description.viewportTransformation;

        var center = upperLeft.add(lowerRight).multiplyWithScalar(0.5);
        var centerScreen = mvp.multiplyWithVector(new Cartesian4(center.x, center.y, center.z, 1.0));
        centerScreen = centerScreen.multiplyWithScalar(1.0 / centerScreen.w);
        var centerClip = clip.multiplyWithVector(centerScreen).getXYZ();

        var surfaceScreen = mvp.multiplyWithVector(new Cartesian4(upperLeft.x, upperLeft.y, upperLeft.z, 1.0));
        surfaceScreen = surfaceScreen.multiplyWithScalar(1.0 / surfaceScreen.w);
        var surfaceClip = clip.multiplyWithVector(surfaceScreen).getXYZ();

        var radius = Math.ceil(surfaceClip.subtract(centerClip).magnitude());
        var diameter = 2.0 * radius;

        return {
            x : Math.floor(centerClip.x) - radius,
            y : Math.floor(centerClip.y) - radius,
            width : diameter,
            height : diameter
        };
    }