function(child, layer, result, currentIndex, realIndex) {
        if (child.children) {
            for (var j = child.children.length - 1; j >= 0; j--) {
                currentIndex += this.parseChildren(child.children[j], layer, result, currentIndex, realIndex);
                realIndex++;
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
                            FORMAT: child.imageType,
                            TRANSPARENT: child.imageType == 'image/png'
                        }, {
                            ref: child.name,
                            visibility: child.isChecked,
                            singleTile: true,
                            isBaseLayer: false
                        }
                    );
                    result.allOlLayers.push(child.layer);
                    this.mapPanel.layers.insert(currentIndex, [
                        new this.recordType({
                            disclaimer: child.disclaimer,
                            legendURL: child.legendImage,
                            layer: child.layer
                        }, child.layer.id)]);
                    return 1;
                }
                else if (child.type == "WMTS") {
                    var format = new OpenLayers.Format.WMTSCapabilities();
                    var allOlLayerIndex = result.allOlLayers.length;
                    var indexToAdd = {
                        currentIndex: currentIndex,
                        realIndex: realIndex
                    };
                    this.indexesToAdd.push(indexToAdd);
                    result.allOlLayers.push(null);
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
                            var layer = format.createLayer(capabilities, {
                                ref: child.name,
                                layer: child.name,
                                maxExtent: capabilities_layer.bounds ?
                                    capabilities_layer.bounds.transform(
                                        "EPSG:4326",
                                        this.mapPanel.map.getProjectionObject()) :
                                    undefined,
                                style: child.style,
                                matrixSet: child.matrixSet,
                                dimension: child.dimension,
                                visibility: child.isChecked,
                                isBaseLayer: false,
                                mapserverURL: child.mapserverURL,
                                mapserverLayers: child.mapserverLayers
                            });
                            child.node.attributes.layer = layer;
                            name = child.name;
                            if (this.initialState && this.initialState['opacity_' + name]) {
                                layer.setOpacity(this.initialState['opacity_' + name]);
                            }
                            layer.setVisibility(child.node.attributes.checked);
                            result.allOlLayers[allOlLayerIndex] = layer;
                            this.mapPanel.layers.insert(indexToAdd.currentIndex, [
                                new this.recordType({
                                    disclaimer: child.disclaimer,
                                    legendURL: child.legendImage,
                                    layer: layer
                                }, layer.id)]);
                            Ext.each(this.indexesToAdd, function(idx) {
                                if (indexToAdd.realIndex < idx.realIndex) {
                                    idx.currentIndex++;
                                }
                            });
                            child.slider.setLayer(layer);
                            child.node.layer = layer;
                            layer.events.on({
                                "visibilitychanged": child.node.onLayerVisibilityChanged,
                                scope: child.node
                            });
                            child.node.on({
                                "checkchange": child.node.onCheckChange,
                                scope: child.node
                            });

                        }
                    });
                }
            }
        }
        return 0;
    }