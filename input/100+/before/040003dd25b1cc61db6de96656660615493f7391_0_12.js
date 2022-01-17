function () {
    var bounds = this.googleMap.getBounds();
    if (!bounds) return [];

    var overlays = komoo.collections.makeFeaturesCollection();
    this.overlays.forEach(function (overlay, index, orig) {
        if (!overlay.getMap() && (overlay.getMarker() && !overlay.getMarker().getVisible())) {
            // Dont verify the intersection if overlay is invisible.
            return;
        }
        if (overlay.getBounds()) {
            if (bounds.intersects(overlay.getBounds())) {
                overlays.push(overlay);
            }
        } else if (overlay.getPosition) {
            if (bounds.contains(overlay.getPosition())) {
                overlays.push(overlay);
            }
        }
    });
    return overlays;
}