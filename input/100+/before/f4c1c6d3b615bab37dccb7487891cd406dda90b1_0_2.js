function() {
    layer = new wax.mm.connector(tilejson);
    m = new MM.Map('map', new wax.mm.connector(tilejson), null, [
        easey.DragHandler(),
        easey.TouchHandler(),
        easey.MouseWheelHandler(),
        easey.DoubleClickHandler()
    ]);
    m.setCenterZoom(new MM.Location(-48,-7),4);

    wax.mm.zoomer(m).appendTo(m.parent);
    wax.mm.interaction()
        .map(m)
        .tilejson(tilejson)
        .on(wax.tooltip().animate(true).parent(m.parent).events())
        .on({
            on: function(e) {
                $('.default-tip').hide();
            },
            off: function(e) {
                $('.default-tip').show();
            }
        });

    var minZoom = 4;
    var maxZoom = 8;
    var topLeft = new MM.Location(9, -75);
    var bottomRight = new MM.Location(-37, -4);

    // -76.1133,-17.8115,-38.1445,6.3153

    m.setZoomRange(minZoom,maxZoom);
    
    m.coordLimits = [
        m.locationCoordinate(topLeft).zoomTo(minZoom),
        m.locationCoordinate(bottomRight).zoomTo(maxZoom)
    ];

    layer.tileLimits = [
        m.locationCoordinate(topLeft).zoomTo(minZoom),
        m.locationCoordinate(bottomRight).zoomTo(maxZoom)
    ];

}