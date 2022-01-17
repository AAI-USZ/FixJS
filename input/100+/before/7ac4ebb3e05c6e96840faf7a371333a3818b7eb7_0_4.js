function(el, layer) {
        var m = new MM.Map(el, layer, null, [
            easey.TouchHandler(),
            easey.DragHandler(),
            easey.DoubleClickHandler(),
            easey.MouseWheelHandler()]);

        m.center = function(location, animate) {
            if (location && animate) {
                easey()
                    .map(this)
                    .to(this.locationCoordinate(location))
                    .optimal(null, null, animate.callback || function() {});
            } else if (location) {
                return this.setCenter(location);
            } else {
                return this.getCenter();
            }
        };

        m.zoom = function(zoom, animate) {
            if (zoom !== undefined && animate) {
                easey()
                    .map(this)
                    .to(this.locationCoordinate(this.getCenter()).copy().zoomTo(zoom))
                    .run(600);
            } else if (zoom !== undefined) {
                return this.setZoom(zoom);
            } else {
                return this.getZoom();
            }
        };

        m.centerzoom = function(location, zoom, animate) {
            if (location && zoom !== undefined && animate) {
                easey()
                    .map(this)
                    .to(this.locationCoordinate(location).zoomTo(zoom))
                    .run(animate.duration || 1000, animate.callback || function() {});
            } else if (location && zoom !== undefined) {
                return this.setCenterZoom(location, zoom);
            }
        };

        return m;
    }