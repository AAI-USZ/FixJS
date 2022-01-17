function() {

        this.tolerance = parseInt(this.toleranceInput.value);

        if(this.snappingLayers.length > 0) {

            this.snapping.deactivate();
            var targets = [];
            for (var i = 0; i <  this.snappingLayers.length; i++) {
                targets.push({
                    layer:this.map.getLayersBy('id',this.snappingLayers[i].substr(9))[0],
                    tolerance: this.tolerance
                });
            }
            this.snapping = new OpenLayers.Control.Snapping({
                layer: this.layer,
                targets: targets
            });
            for (var i = 0; i <  targets.length; i++) {
                // moveTo call is to trigger loading of layer contents
                targets[i].layer.moveTo(this.map.getExtent(), false, false);
            }
            this.snapping.activate();
        } else {
            if (this.snapping.active) {
                this.snapping.deactivate();
                this.snapping.targets = null;
            }
        }
        if (!this.snapping.active) this.deactivate();
    }