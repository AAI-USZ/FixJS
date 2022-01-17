function(overlay) {
    var self = this;
    // container corresponding to current overlay
    var div = $("<div>");
    div.addClass("remove-link");

    // legend to visually associate with an overlay
    var legend = $("<div>");
    legend.css({
        "width" : "20px",
        "height" : "20px",
        "background-color": overlay.polygon.getElement().attr('fill'),
        "opacity": 0.5,
        "float": "left",
        "margin-right": "10px;"
    });
    div.append(legend);

    // actual remove link
    var removeLink = $("<a>");
    removeLink.css({
        "margin": "0 0 0 15px",
        "float": "left"
    });
    removeLink.html("Remove this Overlay");
    removeLink.click(function() {
        self.destroyOverlay(overlay);
        $(div).remove();
    });

    removeLink.hover(overlay.polygon.getElement().node.onmouseover);
    removeLink.mouseout(overlay.polygon.getElement().node.onmouseout);

    div.hover(overlay.polygon.getElement().node.onmouseover);
    div.mouseout(overlay.polygon.getElement().node.onmouseout);

    legend.hover(overlay.polygon.getElement().node.onmouseover);
    legend.mouseout(overlay.polygon.getElement().node.onmouseout);

    div.append(removeLink);
    div.append("<div style='clear:both;'></div>");
    $("#overlay-staging").append(div);
}