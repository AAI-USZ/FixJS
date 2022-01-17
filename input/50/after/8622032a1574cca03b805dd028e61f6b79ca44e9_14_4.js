function() {
        a = wax.attribution();
        a.content(tilejson.attribution);
        a.element().className = 'map-attribution map-g';
        return this;
    }