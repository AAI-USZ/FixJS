function(viewport, nearDepthRange, farDepthRange) {
        var v = viewport || {};
        v.x = v.x || 0.0;
        v.y = v.y || 0.0;
        v.width = v.width || 0.0;
        v.height = v.height || 0.0;
        nearDepthRange = nearDepthRange || 0.0;
        farDepthRange = (typeof farDepthRange === 'undefined') ? 1.0 : farDepthRange;

        var halfWidth = v.width * 0.5;
        var halfHeight = v.height * 0.5;
        var halfDepth = (farDepthRange - nearDepthRange) * 0.5;

        return new Matrix4(
                halfWidth, 0.0,        0.0,       v.x + halfWidth,
                0.0,       halfHeight, 0.0,       v.y + halfHeight,
                0.0,       0.0,        halfDepth, nearDepthRange + halfDepth,
                0.0,       0.0,        0.0,       1.0);
    }