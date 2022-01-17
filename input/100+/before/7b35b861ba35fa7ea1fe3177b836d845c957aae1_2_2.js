function render() {
    context.clearRect(0, 0, width, height);

    // show buildings in high zoom levels only
    if (zoom < MIN_ZOOM || isZooming) {
        return;
    }

    var
        wallColorAlpha   = setAlpha(wallColor,   zoomAlpha*fadeFactor),
        roofColorAlpha   = setAlpha(roofColor,   zoomAlpha*fadeFactor),
        strokeColorAlpha = setAlpha(strokeColor, zoomAlpha*fadeFactor)
    ;

    context.strokeStyle = strokeColorAlpha;

    var
        i, il, j, jl,
        h, f,
        x, y,
        offX = centerX-halfWidth -meta.x,
        offY = centerY-halfHeight-meta.y,
        footprint, roof, walls,
        isVisible,
        ax, ay, bx, by, _a, _b
    ;

    cacheX = {};
    cacheY = {};

    for (i = 0, il = data.length; i < il; i++) {
        isVisible = false;
        h = min(data[i][0]*fadeFactor, MAX_HEIGHT);
		f = data[i][1];

        footprint = new Int32Array(f.length);
        for (j = 0, jl = f.length-1; j < jl; j+=2) {
            footprint[j]   = x = (f[j]  -offX);
            footprint[j+1] = y = (f[j+1]-offY);

            // checking footprint is sufficient for visibility
            !isVisible && (isVisible = (x>0 && x<width && y>0 && y<height));
        }

        if (!isVisible) {
            continue;
        }

        // drawing walls

        context.fillStyle = wallColorAlpha;

        roof = new Int32Array(footprint.length-2);
        walls = [];

        for (j = 0, jl = footprint.length-1-2; j < jl; j+=2) {
            ax = footprint[j];
            ay = footprint[j+1];
            bx = footprint[j+2];
            by = footprint[j+3];

            // project 3d to 2d on extruded footprint
            _a = project(ax, ay, h);
            _b = project(bx, by, h);

            // backface culling check. could this be precalculated partially?
            if ((bx-ax)*(_a.y-ay) > (_a.x-ax)*(by-ay)) {
                // face combining
                if (!walls.length) {
                    walls.unshift(ay);
                    walls.unshift(ax);
                    walls.push(_a.x);
                    walls.push(_a.y);
                }

                walls.unshift(by);
                walls.unshift(bx);
                walls.push(_b.x);
                walls.push(_b.y);
            } else {
                drawShape(walls);
                walls = [];
            }

            roof[j]   = _a.x;
            roof[j+1] = _a.y;
        }

        drawShape(walls);

        // fill roof and optionally stroke it
        context.fillStyle = roofColorAlpha;
        drawShape(roof, strokeRoofs);
    }
}