function (overlay, id) {
    var overlayType;
    if (typeof overlay == "string") {
        overlayType = overlay;
        overlay = this.getOverlay(overlayType, id);
    }

    if (!overlay) return false;
    if (overlay.isHighlighted()) return true;

    overlay.setHighlight(true);
    this.closeInfoWindow();
    this.openInfoWindow(overlay, overlay.getCenter());

    return true;
}