function (event) {
                    // respond to clicks by recentering map
                    if(this_.locationPoint != null) {
                        this_.map.getMap().setCenter(new OpenLayers.LonLat(this_.locationPoint.x, this_.locationPoint.y));
                    }
                }