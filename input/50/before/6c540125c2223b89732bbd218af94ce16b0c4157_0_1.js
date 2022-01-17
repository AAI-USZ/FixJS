function (mmap, llayer) {
            if (bounds == null) {
                bounds = llayer.getDataExtent()
            } else
                bounds.extend(llayer.getDataExtent())
            
            if (index == last_index)
                map.zoomToExtent(bounds, false);
        }