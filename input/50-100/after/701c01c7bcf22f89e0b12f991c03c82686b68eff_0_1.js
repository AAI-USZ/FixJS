function (opts) {
    var options = opts || {};
    if (!this.options.enableInfoWindow ||
            this.addPanel.is(":visible") ||
            this.infoWindow.isMouseover ||
            this.tooltip.feature == options.feature ||
            (options.features && options.feature == this.infoWindow.feature))
        return;

    this.tooltip.open(options);
}