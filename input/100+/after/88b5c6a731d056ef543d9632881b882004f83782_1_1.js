function (event) {
                    // shift terrain cursor to follow mouse movement
                    var nx = Math.round(event.clientX - this_.panel.getEl().getLeft() - this_.axisWidth - this_.currentLeft);
                    this_.terrainCursor.attr({x : nx});

                    // also, show / move the locator marker on the main map
                    var distAlongLS = this.leg.get('legGeometry').getLength() * (nx-this.legStartX)/this.leg.topoGraphSpan;
                    this_.locationPoint = this_.pointAlongLineString(this.leg.get('legGeometry'), distAlongLS);
                    if(this_.markerLayer == null) {
                        this_.markerLayer = this_.map.getMap().getLayersByName('trip-marker-layer')[0];
                    }

                    if(this_.locationMarker == null || this_.locationMarker.attributes.mode != this.leg.get('mode')) {
                        var topoMarkerID = this.leg.get('mode').toLowerCase()+'-topo-marker';
                        this_.locationMarker = this_.markerLayer.getFeatureById(topoMarkerID);
                    }
                    this_.locationMarker.style = null;
                    this_.locationMarker.move(new OpenLayers.LonLat(this_.locationPoint.x, this_.locationPoint.y));
                }