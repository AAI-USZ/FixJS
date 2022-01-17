function() {
    if (!this.enabled || !this.map) return;

    if (this._composite) {

        // Get index of current layer
        var i = 0;
        for (i; i < this.map.layers.length; i++) {
            if (this.map.layers[i] == this) break;
        }

        // If layer is composited by layer below it, don't draw
        for (var j = i - 1; j >= 0; j--) {
            if (this.map.getLayerAt(j).enabled) {
                if (this.map.getLayerAt(j)._composite) {
                    this.parent.innerHTML = '';
                    this.compositeLayer = false;
                    return this;
                }
                else break;
            }
        }

        // Get map IDs for all consecutive composited layers
        var ids = [];
        for (var k = i; k < this.map.layers.length; k++) {
            var l = this.map.getLayerAt(k);
            if (l.enabled) {
                if (l._composite) ids.push(l.id());
                else break;
            }
        }
        ids = ids.join(',');

        if (this.compositeLayer !== ids) {
            this.compositeLayer = ids;
            var that = this;
            mapbox.load(ids, function(tiledata) {
                that.setProvider(new mapbox.provider(tiledata));
                // setProvider calls .draw()
            });
            return this;
        }

    } else {
        // Set back to regular provider
        if (this.compositeLayer) {
            this.compositeLayer = false;
            this.tilejson(this.tilejson());
            // .draw() called by .tilejson()
        }
    }

    return MM.Layer.prototype.draw.call(this);
}