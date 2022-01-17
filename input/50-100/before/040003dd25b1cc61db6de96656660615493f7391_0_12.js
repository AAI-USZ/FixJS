function (overlay, id) {
    var overlayType;
    if (typeof overlay == "string") {
        overlayType = overlay;
        overlay = this.getOverlay(overlayType, id);
    }
    if (!overlay) {
        return false;
    }

    this.panTo(overlay.getCenter(), false);
    return true;
}