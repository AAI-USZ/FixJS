function(e) {
    var gui = e.data.gui;
    var clef = e.data.clef;
    var cShape = e.data.shape;

    if (clef.shape != cShape) {
        clef.setShape(cShape);

        var neumesOnStaff = clef.staff.getPitchedElements({neumes: true, custos: false});
        if (neumesOnStaff.length > 0 && clef.staff.getActingClefByEle(neumesOnStaff[0]) == clef) {
            // if the shift of the clef has affected the first neume on this staff
            // update the custos on the previous staff
            var prevStaff = gui.page.getPreviousStaff(clef.staff);
            if (prevStaff) {
                var newPname = neumesOnStaff[0].components[0].pname;
                var newOct = neumesOnStaff[0].components[0].oct;
                gui.handleUpdatePrevCustos(newPname, newOct, prevStaff);
            }
        }

        var pitchInfo = $.map(clef.staff.getPitchedElements({clef: clef}), function(e) {
            if (e instanceof Toe.Model.Neume) {
                var pitchInfo = new Array();
                $.each(e.components, function(nInd, n) {
                    pitchInfo.push({pname: n.pname, oct: n.oct});
                });
                return {id: e.id, noteInfo: pitchInfo};
            }
            else if (e instanceof Toe.Model.Custos) {
                // the custos has been vertically moved
                // update the custos bounding box information in the model
                // do not need to update pitch name & octave since this does not change
                var outbb = gui.getOutputBoundingBox([e.zone.ulx, e.zone.uly, e.zone.lrx, e.zone.lry]);
                $.post(gui.prefix + "/edit/" + gui.fileName + "/move/custos", {id: e.id, ulx: outbb[0], uly: outbb[1], lrx: outbb[2], lry: outbb[3]})
                .error(function() {
                    // show alert to user
                    // replace text with error message
                    $("#alert > p").text("Server failed to move custos. Client and server are not synchronized.");
                    $("#alert").animate({opacity: 1.0}, 100);
                });
            }
        });

        var outbb = gui.getOutputBoundingBox([clef.zone.ulx, clef.zone.uly, clef.zone.lrx, clef.zone.lry]);
        var args = {id: clef.id, shape: cShape, ulx: outbb[0], uly: outbb[1], lrx: outbb[2], lry: outbb[3], pitchInfo: pitchInfo};

        // send pitch shift command to server to change underlying MEI
        $.post(gui.prefix + "/edit/" + gui.fileName + "/update/clef/shape", {data: JSON.stringify(args)})
        .error(function() {
            // show alert to user
            // replace text with error message
            $("#alert > p").text("Server failed to update clef shape. Client and server are not synchronized.");
            $("#alert").animate({opacity: 1.0}, 100);
        });

        $(this).toggleClass("active");
    }

    return false;
}