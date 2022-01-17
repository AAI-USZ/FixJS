function (overlay, latLng, opt_content) {
    if (this.mode) return;
    this.closeTooltip();
    this.infoWindow.open(overlay, latLng, opt_content);
}