function(map) {
        map.addCallback('drawn', function(map, e) {
            if (map.coordinate.zoom === map.coordLimits[0].zoom) {
                zoomout.className = 'zoomer zoomout zoomdisabled';
            } else if (map.coordinate.zoom === map.coordLimits[1].zoom) {
                zoomin.className = 'zoomer zoomin zoomdisabled';
            } else {
                zoomin.className = 'zoomer zoomin';
                zoomout.className = 'zoomer zoomout';
            }
        });
        return zoomer;
    }