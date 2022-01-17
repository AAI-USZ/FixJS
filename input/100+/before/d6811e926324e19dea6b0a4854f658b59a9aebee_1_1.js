function addHexOverLay()
{
    hexdata = formResponseMngr.getAsHexbinGeoJSON();
    // The following line converts geoJSON Polygons into L.Polygon
    // there may be a way to do this 'natively' through Leaflet
    polygons = _.compact(
                 _.map(hexdata.features, function(el) {
                    if (el.properties.count) {
                        return new L.Polygon(_.map(el.geometry.coordinates, 
                            function(x) { return new L.LatLng(x[0], x[1]); }),
                            {fillOpacity: el.properties.count / (el.properties.countMax * 1.2)}
                            );
                    } else {
                        return undefined;
                    }
               }));
    _(polygons).map(function(x) { map.addLayer(x); });
}