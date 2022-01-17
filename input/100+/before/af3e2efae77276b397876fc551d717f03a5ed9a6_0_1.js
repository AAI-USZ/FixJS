function drawLine(map, lineLayer, position, angleInDegrees) {
        lineLayer.removeAllFeatures();

        var lon1 = position.coords.longitude;
        var lat1 = position.coords.latitude;
        var angleInRadians = 2 * Math.PI * angleInDegrees / 360;
        var lon2 = position.coords.longitude + 0.01 * Math.sin(angleInRadians);
        var lat2 = position.coords.latitude + 0.01 * Math.cos(angleInRadians);

        var points = new Array(
           new OpenLayers.Geometry.Point(lon1, lat1).transform(
                new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
                map.getProjectionObject() // to Spherical Mercator Projection
              ),
           new OpenLayers.Geometry.Point(lon2, lat2).transform(
                new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
                map.getProjectionObject() // to Spherical Mercator Projection
              )
        );

        var line = new OpenLayers.Geometry.LineString(points);

        var style = { 
          strokeColor: '#0000ff', 
          strokeOpacity: 0.8,
          strokeWidth: 5
        };

        var lineFeature = new OpenLayers.Feature.Vector(line, null, style);
        lineLayer.addFeatures([lineFeature]);
    }