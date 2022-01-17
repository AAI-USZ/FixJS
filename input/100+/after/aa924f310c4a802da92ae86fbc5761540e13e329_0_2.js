function(child, layer, result, index) {
        if (child.children) {
            for (var j = 0, jj = child.children.length; j < jj; j++) {
                this.parseChildren(child.children[j], layer, result, index);
            }
        }
        else {
            if (child.disclaimer) {
                result.disclaimer[child.disclaimer] = true;
            }
            result.allLayers.push(child.name);
            if (child.childLayers) {
                result.childLayers = result.childLayers || {};
                result.childLayers[child.name] = child.childLayers;
            }
            if (child.isChecked) {
                result.checkedLayers.push(child.name);
            }
            // put a reference to ol layer in the config object
            if (layer) {
                child.layer = layer;
            }
            else {
                if (child.type == "external WMS") {
                    child.layer = new OpenLayers.Layer.WMS(
                        child.name, child.url, {
                            STYLE: child.style,
                            LAYER: child.name,
                            format: child.imageType,
                            transparent: child.imageType == 'image/png'
                        }, {
                            ref: child.name,
                            visibility: child.isChecked,
                            singleTile: true,
                            isBaseLayer: false
                        }
                    );
                    result.allOlLayers.push(child.layer);
                    this.mapPanel.layers.insert(index, [
                        new this.recordType({
                            disclaimer: child.disclaimer,
                            legendURL: child.legendImage,
                            layer: child.layer
                        }, child.layer.id)]);
                }
                else if (child.type == "WMTS") {
                    format = new OpenLayers.Format.WMTSCapabilities();
                    allOlLayerIndex = result.allOlLayers.length;
                    OpenLayers.Request.GET({
                        url: child.url,
                        scope: this,
                        success: function(request) {
                            var doc = request.responseXML;
                            if (!doc || !doc.documentElement) {
                                doc = request.responseText;
                            }
                            var capabilities = format.read(doc);
                            var capabilities_layers = capabilities.contents.layers
                            var capabilities_layer = null;
                            for (i = 0, ii = capabilities_layers.length;
                                    i < ii ; i++) {
                                if (capabilities_layers[i].identifier == child.name) {
                                    capabilities_layer = capabilities_layers[i];
                                }
                            }
                            capabilities_layer.b
                            child.layer = format.createLayer(capabilities, {
                                ref: child.name,
                                layer: child.name,
                                maxExtent: capabilities_layer.bounds.transform(
                                        "EPSG:4326", 
                                        this.mapPanel.map.getProjectionObject()),
                                style: child.style,
                                matrixSet: child.matrixSet,
                                dimension: child.dimension,
                                visibility: child.isChecked,
                                isBaseLayer: false,
                                mapserverURL: child.mapserverURL,
                                mapserverLayers: child.mapserverLayers
                            });
                            result.allOlLayers.splice(allOlLayerIndex, 0, child.layer);
                            this.mapPanel.layers.insert(index, [
                                new this.recordType({
                                    disclaimer: child.disclaimer,
                                    legendURL: child.legendImage,
                                    layer: child.layer
                                }, child.layer.id)]);
                            child.slider.setLayer(child.layer);
                        }
                    });
                }
            }
        }
    }