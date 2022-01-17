function(map_container) {
    var self = this;
    if (typeof jQuery == 'undefined') {
        alert("MapManager requires jQuery to function.");
        return;
    }
    // options
    self.options = {
        precision : 5,

    }
    // member vars
    self.viewer = null;
    self.overlays = [];
    self.newOverlays = [];
    self.newOverlayPoints = [];
    self.data = null;
    self.isDirty = false;

    self.viewer = new Seadragon.Viewer("mapcontainer");
    self.viewer.openDzi("/images/map/GeneratedImages/dzc_output.xml");

    self.points = [];

    // listeners to print data to screen
    self.viewer.addEventListener("open", self._showViewport);
    self.viewer.addEventListener("animation", self._showViewport);
    //Seadragon.Utils.addEvent(self.viewer.elmt, "mousemove", self.showMouse);
    // listener to add click points to img
    var tempMarker = null;
    self.viewer.tracker.clickHandler = function(tracker, position) {
        var pixel = Seadragon.Utils.getMousePosition(self.event).minus(Seadragon.Utils.getElementPosition(self.viewer.elmt));
        var point = self.viewer.viewport.pointFromPixel(pixel);
        console.log(point);
        if (!self.points) {self.points = new Array();}

        var newPoint = new No5.Seajax.toImageCoordinates(self.viewer, point.x, point.y);

        self.points.push(newPoint);

        console.log("attempting overlay");
        var img = document.createElement("img");
        img.src = "/wp-content/themes/viewsofrome-theme/images/point_marker.gif";
        img.className = 'temp-point';
        console.log(img);
        // $(point.img).addClass('temp-point');
        var anchor = new Seadragon.Point(point.x, point.y);
        var placement = Seadragon.OverlayPlacement.BOTTOM;
        self.viewer.drawer.addOverlay(img, anchor, placement);

        console.log(point);
    }
}