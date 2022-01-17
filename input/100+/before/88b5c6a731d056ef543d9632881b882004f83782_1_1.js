function (event) {
                    // shift terrain cursor to follow mouse movement
                    var nx = Math.round(event.clientX - thisTR.panel.getEl().getLeft() - thisTR.axisWidth - thisTR.currentLeft);
                    thisTR.terrainCursor.attr({x : nx});

                    // also, show / move the locator marker on the main map
                    var distAlongLS = this.leg.get('legGeometry').getLength() * (nx-this.legStartX)/this.leg.topoGraphSpan;
                    thisTR.locationPoint = thisTR.pointAlongLineString(this.leg.get('legGeometry'), distAlongLS);
                    if(thisTR.markerLayer == null) {
                        thisTR.markerLayer = thisTR.map.getMap().getLayersByName('trip-marker-layer')[0];
                    }

                    if(thisTR.locationMarker == null || thisTR.locationMarker.attributes.mode != this.leg.get('mode')) {
                        var topoMarkerID = this.leg.get('mode').toLowerCase()+'-topo-marker';
                        thisTR.locationMarker = thisTR.markerLayer.getFeatureById(topoMarkerID);
                    }
                    thisTR.locationMarker.style = null;
                    thisTR.locationMarker.move(new OpenLayers.LonLat(thisTR.locationPoint.x, thisTR.locationPoint.y));
                }