function() {
    var self = this;

    var overlay = self.getNewOverlayFromPoints(self.points);

    // attach overlay to the map
    overlay.polygon.attachTo(self.viewer);

    // push to overlays for serialization
    self.newOverlays.push(overlay);

    self.addOMDiv(overlay);

    setTimeout(function() {
        overlay.polygon.redraw(self.viewer);
    }, 500);

    //clear temp points
    self.points = [];
    $('img.temp-point').each(function(index, item) {
        self.viewer.drawer.removeOverlay(item);
    });
}