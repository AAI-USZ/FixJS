function loadData() {
    if (zoom < MIN_ZOOM) {
        return;
    }

    var
        // create bounding box of double viewport size
        nw = pixelToGeo(centerX-width, centerY-height),
        se = pixelToGeo(centerX+width, centerY+height)
    ;

    xhr(template(url, {
        w: nw[LON],
        n: nw[LAT],
        e: se[LON],
        s: se[LAT],
        z: zoom
    }), onDataLoaded);
}