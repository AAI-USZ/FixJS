function () {
            if (komooMap.tooltip.isMouseover || komooMap.addPanel.is(":visible") || komooMap.mode == komoo.Mode.SELECT_CENTER) {
                return;
            }
            komooMap.openTooltip(overlay, e.latLng);
        }