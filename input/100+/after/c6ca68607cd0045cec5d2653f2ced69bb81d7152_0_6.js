function(map, tilejson) {
    tilejson = tilejson || {};

    var a, // internal attribution control
        attribution = {};

    attribution.element = function() {
        return a.element();
    };

    attribution.appendTo = function(elem) {
        wax.u.$(elem).appendChild(a.element());
        return attribution;
    };

    attribution.init = function() {
        a = wax.attribution();
        a.content(tilejson.attribution);
        a.element().className = 'map-attribution map-mm';
        return attribution;
    };

    return attribution.init();
}