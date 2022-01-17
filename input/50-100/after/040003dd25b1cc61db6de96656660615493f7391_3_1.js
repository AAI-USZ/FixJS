function () {
    var overlayCenter;
    if (this.overlay_.getCenter) {
        overlayCenter = this.overlay_.getCenter();
    } else if (this.overlay_.getPosition) {
        overlayCenter = this.overlay_.getPosition();
    } else if (this.getBounds()) {
        overlayCenter = this.getBounds().getCenter();
    }
    return overlayCenter;
}