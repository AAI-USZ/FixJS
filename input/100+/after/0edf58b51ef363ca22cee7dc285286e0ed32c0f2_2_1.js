function( state) {
    // turn off active laters
    // create a copy of the activeLayers list and use that copy to iteratively deactivate
    var activeLayers = $.map(app.viewModel.activeLayers(), function(layer) {
        return layer;
    });
    //var activeLayers = $.extend({}, app.viewModel.activeLayers());
    $.each(activeLayers, function (index, layer) {
        layer.deactivateLayer();
    });
    // turn on the layers that should be active
    if (state.activeLayers) {
        $.each(state.activeLayers, function(index, layer_id) {
            app.viewModel.layerIndex[layer_id].activateLayer();
        });
    }

    // Google.v3 uses EPSG:900913 as projection, so we have to
    // transform our coordinates
    app.map.setCenter(new OpenLayers.LonLat(state.location.x, state.location.y).transform(
    new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913")), state.location.zoom);

}