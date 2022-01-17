function(zoom, animate) {
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
    }