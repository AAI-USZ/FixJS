function(layer, snappingEnabled) {
        if(snappingEnabled) {
            this.snappingLayers.splice(this.snappingLayers.indexOf(layer), 1);
        } else {
            this.snappingLayers.push(layer);
        }
        this.redraw();
    }