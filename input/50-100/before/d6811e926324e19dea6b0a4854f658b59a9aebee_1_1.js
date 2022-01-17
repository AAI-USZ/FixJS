function(el) {
                    if (el.properties.count) {
                        return new L.Polygon(_.map(el.geometry.coordinates, 
                            function(x) { return new L.LatLng(x[0], x[1]); }),
                            {fillOpacity: el.properties.count / (el.properties.countMax * 1.2)}
                            );
                    } else {
                        return undefined;
                    }
               }