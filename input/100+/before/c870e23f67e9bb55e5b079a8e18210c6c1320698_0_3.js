function(points) {
    console.log(this);
    var self = this;

    var viewer = self.viewer; // hack because Seajax uses global viewer for this

    // get the polygon and overlay obects for manipulation
    var polygon = new EUL.Utils.Polygon(points, self.viewer);
    var overlay = new EUL.OverlayManager.Overlay();

    overlay.polygon = polygon;

    // TODO: look into default classes and adding htem to the dom?
    // set polygon's fill color
    var fillColor = EUL.Utils.Colors.getColor();
    overlay.polygon.getElement().attr({
        "fill" : fillColor, 
        "fill-opacity" : 0.5
    });
    $(overlay.polygon.div).addClass("overlay-div");

    // event handlers for the overlay
    polyElement = overlay.polygon.getElement();
    polyElement.node.onmouseover = function() {
        polyElement.attr({
            'fill': '#fff'
        });
    }

    polyElement.node.onmouseout = function() {
        polyElement.attr({
            'fill': fillColor
        })
    }

    polyElement.node.onclick = function() {}

    return overlay;
}