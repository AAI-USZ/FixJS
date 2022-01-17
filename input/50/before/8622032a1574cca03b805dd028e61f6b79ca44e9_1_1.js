function() {
        a = wax.attribution();
        a.content(tilejson.attribution);
        a.element().className = 'wax-attribution wax-g';
        return this;
    }