function (e) {
        if (komooMap.tooltip.feature == feature || komooMap.addPanel.is(":visible") ||
                !komooMap.options.enableInfoWindow) {
            return;
        }
        clearTimeout(komooMap.tooltip.timer);
        var delay = 0;
        if (feature.getProperties().type == "Community") {
            delay = 400;
        }
        komooMap.tooltip.timer = setTimeout(function () {
            if (komooMap.tooltip.isMouseover || komooMap.addPanel.is(":visible") || komooMap.mode == komoo.Mode.SELECT_CENTER) {
                return;
            }
            komooMap.openTooltip(feature, e.latLng);
        }, delay);
    }