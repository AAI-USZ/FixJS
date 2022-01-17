function (e) {
        if (komooMap.addPanel.is(":hidden")) {
            komooMap.setCurrentFeature(null);  // Remove the feature selection
        }
        if (komooMap.mode == komoo.Mode.SELECT_CENTER) {
            komooMap._emit_center_selected(e.latLng);
        }
        komooMap._emit_mapclick(e);
    }