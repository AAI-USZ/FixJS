function (e) {
        if (komooMap.addPanel.is(":hidden")) {
            komooMap.setCurrentOverlay(null);  // Remove the overlay selection
        }
        if (komooMap.mode == komoo.Mode.SELECT_CENTER) {
            komooMap._emit_center_selected(e.latLng);
        }
        komooMap._emit_mapclick(e);
    }