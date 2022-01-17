function () {
        var do_extend = function (mmap, llayer) {
            if (bounds == null) {
                bounds = llayer.getDataExtent()
            } else
                bounds.extend(llayer.getDataExtent())
            map.zoomToExtent(bounds, false);
        }
        var layer = init_gpx_layer(map, $(this).text(), $(this).attr("rel"), do_extend)
        $(this).data("layer", layer)
    }