function(tilejson) {
        var m = new MM.Map('map',
        new wax.mm.connector(tilejson));
        m.setCenterZoom(new MM.Location(tilejson.center[1],
            tilejson.center[0]),
            tilejson.center[2]);

        wax.mm.zoomer(m).appendTo(m.parent);
        wax.mm.interaction()
            .map(m)
            .tilejson(tilejson)
            .on(wax.tooltip().animate(true).parent(m.parent).events());
        wax.mm.legend(m, tilejson).appendTo(m.parent);

        document.getElementById('title').innerHTML = tilejson.name;
        document.getElementById('description').innerHTML = tilejson.description;
        document.getElementById('attribution').innerHTML = tilejson.attribution;
        reveal();
    }