function addHexOverLay()
{
    hexbinData = formResponseMngr.getAsHexbinGeoJSON(); // global var
    var arr_to_latlng = function(arr) { return new L.LatLng(arr[0], arr[1]); };
    var hex_feature_to_polygon_properties = function(el) {
        var color = getProportionalColor(el.properties.count / (el.properties.countMax * 1.2));
        return {fillColor: color, fillOpacity: 0.9, color:'grey', weight: 1};
    };
    _rebuildHexOverLay(hexbinData, hex_feature_to_polygon_properties);
}