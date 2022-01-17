function (e) {
    var nodeWidth = 6;
    var proj = this.googleMap.getProjection();
    var clickPoint = proj.fromLatLngToPoint(e.latLng);
    var poly = this.currentOverlay;
    var minDist = 512;
    var selectedIndex = -1;
    var pathIndex = -1;
    var paths;
    if (poly.getGeometry().getPaths) {
        paths = poly.getGeometry().getPaths();
    } else if (poly.getGeometry().getPath) {
        paths = new google.maps.MVCArray([poly.getGeometry().getPath()]);
    } else {
        return false;
    }
    var nodeToDelete;
    var pathWithNode;
    paths.forEach(function (path, i) {
        for (var n = 0 ; n < path.getLength() ; n++) {
            var nodePoint = proj.fromLatLngToPoint(path.getAt(n));
            var dist = Math.sqrt(Math.pow(Math.abs(clickPoint.x - nodePoint.x), 2) + Math.pow(Math.abs(clickPoint.y - nodePoint.y), 2));
            if (dist < minDist) {
                minDist = dist;
                selectedIndex = n;
                pathIndex = i;
                nodeToDelete = path.getAt(n);
                pathWithNode = path;
            }
        }
    });
    // Check if we are clicking inside the node
    var ovProj = this.overlayView.getProjection();
    var clickPx = ovProj.fromLatLngToContainerPixel(e.latLng);
    var nodePx = ovProj.fromLatLngToContainerPixel(nodeToDelete);
    var xDist = Math.abs(nodePx.x - clickPx.x);
    var yDist = Math.abs(nodePx.y - clickPx.y);
    if (xDist < nodeWidth && yDist < nodeWidth) {
        pathWithNode.removeAt(selectedIndex);
        if (pathWithNode.getLength() == 0) {
            paths.removeAt(pathIndex);
        }
        return true;
    }
    return false;
}