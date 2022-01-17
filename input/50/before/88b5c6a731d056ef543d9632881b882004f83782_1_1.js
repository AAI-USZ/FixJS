function (event) {
                    // respond to clicks by recentering map
                    if(thisTR.locationPoint != null) {
                        thisTR.map.getMap().setCenter(new OpenLayers.LonLat(thisTR.locationPoint.x, thisTR.locationPoint.y));
                    }
                }