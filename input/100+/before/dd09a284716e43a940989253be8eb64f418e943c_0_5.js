function(e) {
    var gui = e.data.gui;
    var shape = e.data.shape;
    var punctum = e.data.punctum;
    var nc = punctum.components[0];

    nc.setHeadShape(shape);

    // deal with head shapes that change the neume name
    if (shape == "virga") {
        punctum.name = "Virga";
        punctum.typeid = "virga";
    }
    else if (shape == "cavum") {
        punctum.name = "Cavum";
        punctum.typeid = "cavum";
    }

    // update drawing
    punctum.syncDrawing();

    var outbb = gui.getOutputBoundingBox([punctum.zone.ulx, punctum.zone.uly, punctum.zone.lrx, punctum.zone.lry]);
    var args = {id: punctum.id, shape: shape, ulx: outbb[0], uly: outbb[1], lrx: outbb[2], lry: outbb[3]};

    // send change head command to server to change underlying MEI
    $.post(gui.prefix + "/edit/" + gui.fileName + "/update/neume/headshape", args)
    .error(function() {
        // show alert to user
        // replace text with error message
        $("#alert > p").text("Server failed to change note head shape. Client and server are not synchronized.");
        $("#alert").animate({opacity: 1.0}, 100);
    });

    return false;
}