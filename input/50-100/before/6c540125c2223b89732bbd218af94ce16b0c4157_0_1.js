function() {
        map = $("#gpxChoix").data("map")
        var layer = $(this).data("layer")
        zoomTo(map, layer, false)
    }