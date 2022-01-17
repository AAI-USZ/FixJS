function() {
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
    }