function createGpxesMap() {
    var map = loadMap("gpxChoix");
    $("#gpxChoix").data("map", map)
    
    $(".gpxTrack").each(function (index) {
        var this_trak = $(this)
        var ready = function() {
            layer.setVisibility(false)
            this_trak.data("ready", true)
            var text = this_trak.text()
            this_trak.text(text.substring(0, text.length - 4))
            
        }
        var layer = init_gpx_layer(map, $(this).text(), $(this).attr("rel"), ready)
        $(this).data("layer", layer)
        $(this).data("ready", false)
        this_trak.text(this_trak.text()+" ...")
    })

    $(".gpxTrack").click(function() {
        if (!$(this).data("ready")) {
            alert("Track not ready yet.")
            return
        }
        var layer = $(this).data("layer")
        if (layer.getVisibility()) {
            layer.setVisibility(false)
        } else {
            map = $("#gpxChoix").data("map")
            layer.setVisibility(true)
            zoomTo(map, layer, false)
        }
    })
    
}