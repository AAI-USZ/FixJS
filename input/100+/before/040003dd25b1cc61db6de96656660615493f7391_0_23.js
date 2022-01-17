function (e) {
        if (komooMap.tooltip.overlay == overlay || komooMap.addPanel.is(":visible") ||
                !komooMap.options.enableInfoWindow) {
            return;
        }
        clearTimeout(komooMap.tooltip.timer);
        var delay = 0;
        if (overlay.getProperties().type == "Community") {
            delay = 400;
        }
        komooMap.tooltip.timer = setTimeout(function () {
            if (komooMap.tooltip.isMouseover || komooMap.addPanel.is(":visible") || komooMap.mode == komoo.Mode.SELECT_CENTER) {
                return;
            }
            komooMap.openTooltip(overlay, e.latLng);
        }, delay);
    }