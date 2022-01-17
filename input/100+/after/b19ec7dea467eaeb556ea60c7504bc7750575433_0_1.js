function createGpxesMap() {
    var map = loadMap("gpxChoix");
    $("#gpxChoix").data("map", map)
    var bounds = null;
    var last_index = $(".gpxTrack").size() - 1
    
    $(".gpxTrack").each(function (index) {
        var do_extend = function (mmap, llayer) {
            if (bounds == null) {
                bounds = llayer.getDataExtent()
            } else
                bounds.extend(llayer.getDataExtent())
            
            if (index == last_index)
                map.zoomToExtent(bounds, false);
        }
        var layer = init_gpx_layer(map, $(this).text(), $(this).attr("rel"), do_extend)
        $(this).data("layer", layer)
    })

    $(".gpxTrack").click(function() {
        map = $("#gpxChoix").data("map")
        var layer = $(this).data("layer")
        zoomTo(map, layer, false)
    })
    
}