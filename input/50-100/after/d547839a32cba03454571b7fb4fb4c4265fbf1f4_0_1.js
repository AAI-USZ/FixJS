function () {
    var overlayCenter;
    if (this.object_.getCenter) {
        overlayCenter = this.object_.getCenter();
    } else if (this.object_.getPosition) {
        overlayCenter = this.object_.getPosition();
    } else if (this.getBounds()) {
        overlayCenter = this.getBounds().getCenter();
    }
    return overlayCenter;
}