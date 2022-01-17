function keydownHandler(e) {
        switch (e.keyCode) {
        case 'Q'.charCodeAt(0):
            imageryLayerCollection.raise(bingAerialLayer);
            break;
        case 'A'.charCodeAt(0):
            imageryLayerCollection.lower(bingAerialLayer);
            break;
        case 'W'.charCodeAt(0):
            imageryLayerCollection.raise(bingRoadLayer);
            break;
        case 'S'.charCodeAt(0):
            imageryLayerCollection.lower(bingRoadLayer);
            break;
        case 'E'.charCodeAt(0):
            imageryLayerCollection.raise(esriLayer);
            break;
        case 'D'.charCodeAt(0):
            imageryLayerCollection.lower(esriLayer);
            break;
        case "3".charCodeAt(0): // "3" -> 3D globe
            cb.showSkyAtmosphere = true;
            cb.showGroundAtmosphere = true;
            transitioner.morphTo3D();
            break;
        case "2".charCodeAt(0): // "2" -> Columbus View
            cb.showSkyAtmosphere = false;
            cb.showGroundAtmosphere = false;
            transitioner.morphToColumbusView();
            break;
        case "1".charCodeAt(0): // "1" -> 2D map
            cb.showSkyAtmosphere = false;
            cb.showGroundAtmosphere = false;
            transitioner.morphTo2D();
            break;
        }
    }