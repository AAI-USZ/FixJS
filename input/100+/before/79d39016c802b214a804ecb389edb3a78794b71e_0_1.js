function(evt) {
        var feature = evt.feature;
        var content;

        if (!feature.cluster) {
            content = feature.attributes.title + '<br/>' + feature.attributes.description;
        } else {
            content = '';
            var length = Math.min(feature.cluster.length, 50);
            for (var c = 0; c < length; c++) {
                content += feature.cluster[c].attributes.title + '<br/>';
            }
            if (length < feature.cluster.length) {
                content += '(...)';
            }
        }
        var self = this;

        var popup = new OpenLayers.Popup.FramedCloud('featurePopup',
            feature.geometry.getBounds().getCenterLonLat(),
            new OpenLayers.Size(300, 100),
            content, null, true,
            function(evt) {
                var feature = this.feature;
                if (feature.layer) {
                    self.selectControl.unselect(feature);
                } else {
                    this.destroy();
                }
            }
        );

        popup.maxSize = new OpenLayers.Size(500, 300);
        feature.popup = popup;
        popup.feature = feature;
        this.map.addPopup(popup, true);
    }