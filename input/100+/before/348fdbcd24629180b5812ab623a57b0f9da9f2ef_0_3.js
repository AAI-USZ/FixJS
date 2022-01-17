function(request) {
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
                            this.mapPanel.layers.insert(indexToAdd.index, [
                                new this.recordType({
                                    disclaimer: child.disclaimer,
                                    legendURL: child.legendImage,
                                    layer: layer
                                }, layer.id)]);
                            Ext.each(this.indexToAdd, function(idx) {
                                if (idx.index >= index) {
                                    idx.index++;
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