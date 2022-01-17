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