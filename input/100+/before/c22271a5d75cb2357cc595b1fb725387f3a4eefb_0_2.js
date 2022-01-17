function(options) {
    var self = this;
    if (typeof jQuery == 'undefined') {
        alert("MapManager requires jQuery to function.");
        return;
    }
    // options
    self.options = {
        precision : 5,
        map_container : "mapcontainer",
        dzi_path: "/images/map/GeneratedImages/dzc_output.xml",
        edit_mode: false
    }
    jQuery.extend(self.options, options);

    // member vars
    self.viewer = null;
    self.overlays = [];
    self.newOverlays = [];
    self.newOverlayPoints = [];
    self.data = null;
    self.isDirty = false;

    self.viewer = new Seadragon.Viewer(self.options.map_container);
    self.viewer.openDzi(self.options.dzi_path);

    self.points = [];

    // listeners to print data to screen
    self.viewer.addEventListener("open", self._showViewport);
    self.viewer.addEventListener("animation", self._showViewport);
    //Seadragon.Utils.addEvent(self.viewer.elmt, "mousemove", self.showMouse);
    // listener to add click points to img
    var tempMarker = null;
    self.defaultClickHandler = self.viewer.tracker.clickHandler;

    // TODO: look into only overriding this if we are in edit mode
    self.viewer.tracker.clickHandler = function(tracker, position) {
        if (!self.options.edit_mode) {
            return;
        }
        if (!self.event.shiftKey) {
            return;
        }

        var pixel = Seadragon.Utils.getMousePosition(self.event).minus(Seadragon.Utils.getElementPosition(self.viewer.elmt));
        var point = self.viewer.viewport.pointFromPixel(pixel);
        
        if (!self.points) {self.points = new Array();}

        var newPoint = new No5.Seajax.toImageCoordinates(self.viewer, point.x, point.y);

        self.points.push(newPoint);

        var img = document.createElement("img");
        img.src = "/wp-content/themes/viewsofrome-theme/images/point_marker.gif";
        img.className = 'temp-point';
        
        // $(point.img).addClass('temp-point');
        var anchor = new Seadragon.Point(point.x, point.y);
        var placement = Seadragon.OverlayPlacement.CENTER;
        self.viewer.drawer.addOverlay(img, anchor, placement);
    }
}