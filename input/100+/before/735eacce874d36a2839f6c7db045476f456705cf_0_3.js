function(e) {
    var gui = e.data.gui;
    var modifier = e.data.modifier;

    // only need to neumify if a group of objects are selected
    var selection = gui.rendEng.canvas.getActiveGroup();
    if (selection) {
        // there is something selected
        // make sure there are at least 2 neumes on the same staff to work with
        var neumes = new Array();
        var sModel = null;
        $.each(selection.getObjects(), function (oInd, o) {
            if (o.eleRef instanceof Toe.Model.Neume) {
                if (!sModel) {
                    sModel = o.eleRef.staff;
                }

                if (o.eleRef.staff == sModel) {
                    neumes.push(o);
                }
            }
        });

        if (neumes.length < 2) {
            return;
        }

        // sort the group based on x position (why fabric doesn't do this, I don't know)
        neumes.sort(function(o1, o2) {
            return o1.eleRef.zone.ulx - o2.eleRef.zone.ulx;
        });

        // begin the NEUMIFICATION
        var newNeume = new Toe.Model.Neume({modifier: modifier});
                        
        numPunct = 0;
        var nids = new Array();
        var ulx = Number.MAX_VALUE;
        var uly = Number.MAX_VALUE;
        var lry = Number.MIN_VALUE;
        $.each(neumes, function (oInd, o) {
            var nModel = o.eleRef;

            // grab underlying notes
            $.merge(newNeume.components, o.eleRef.components);
            numPunct += o.eleRef.components.length;

            // update neume ids
            nids.push(o.eleRef.id);

            // calculate object's absolute positions from within selection group
            var left = selection.left + o.left;
            var top = selection.top + o.top;
            
            ulx = Math.min(ulx, left - o.currentHeight/2);
            uly = Math.min(uly, top - o.currentHeight/2);
            lry = Math.max(lry, top + o.currentHeight/2);

            // remove the neume, we don't need it anymore
            sModel.removeElementByRef(o.eleRef);
            gui.rendEng.canvas.remove(o);
        });
        var lrx = ulx + numPunct*gui.punctWidth;

        // set the bounding box hint of the new neume for drawing
        var bb = [ulx, uly, lrx, lry];
        newNeume.setBoundingBox(bb);

        // instantiate neume view and controller
        var nView = new Toe.View.NeumeView(gui.rendEng);
        var nCtrl = new Toe.Ctrl.NeumeController(newNeume, nView);

        // render the new neume
        sModel.addNeume(newNeume);

        // get final bounding box information
        var outbb = gui.getOutputBoundingBox([newNeume.zone.ulx, newNeume.zone.uly, newNeume.zone.lrx, newNeume.zone.lry]);

        var typeid = newNeume.typeid;

        // get note head shapes to change in underlying mei
        var headShapes = $.map(newNeume.components, function(nc) {
            return nc.props.type;
        });

        var data = JSON.stringify({"nids": nids.join(","), "typeid": typeid, "headShapes": headShapes, "ulx": outbb[0], "uly": outbb[1], "lrx": outbb[2], "lry": outbb[3]});
        // call server neumify function to update MEI
        $.post(gui.apiprefix + "/neumify", {data: data}, function(data) {
            // set id of the new neume with generated ID from the server
            newNeume.id = JSON.parse(data).id;
        })
        .error(function() {
            // show alert to user
            // replace text with error message
            $("#alert > p").text("Server failed to neumify selected neumes. Client and server are not synchronized.");
            $("#alert").animate({opacity: 1.0}, 100);
        });

        gui.rendEng.canvas.discardActiveGroup();

        // select the new neume
        $(newNeume).trigger("vSelectDrawing");

        gui.rendEng.repaint();
    }

    return false;
}