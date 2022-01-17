function (type, opt_categories, opt_strict) {
    var overlays = this.getOverlaysByType(type, opt_categories, opt_strict);
    return this.hideOverlays(overlays);
}