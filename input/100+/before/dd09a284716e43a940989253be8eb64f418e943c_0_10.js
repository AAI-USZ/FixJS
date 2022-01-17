function(e) {
    var gui = e.data.gui;

    // get current canvas selection
    // check individual selection and group selections
    toDelete = {clefs: new Array(), nids: new Array(), dids: new Array()};

    var deleteClef = function(drawing) {
        var clef = drawing.eleRef;
        var staff = clef.staff;

        // get previous acting clef
        //  (NOTE: this should always be defined
        // since the first clef on a system is not allowed to be deleted)
        var pClef = staff.getPreviousClef(clef);

        // get references to pitched elements that will be changed after
        // the clef is deleted.
        var pitchedEles = staff.getPitchedElements(clef);

        // now delete the clef, and update the pitch information of these elements
        staff.removeElementByRef(clef);
        staff.updatePitchedElements(pClef);

        // gather the pitch information of the pitched notes
        var pitchInfo = $.map(pitchedEles, function(e) {
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

        toDelete.clefs.push({id: clef.id, pitchInfo: pitchInfo});

        gui.rendEng.canvas.remove(drawing);
        gui.rendEng.canvas.discardActiveObject();
    };

    var deleteNeume = function(drawing) {
        var neume = drawing.eleRef;

        var neumesOnStaff = neume.staff.getPitchedElements({neumes: true, custos: false});

        neume.staff.removeElementByRef(neume);
        toDelete.nids.push(neume.id);

        gui.rendEng.canvas.discardActiveObject();

        if (neumesOnStaff.length == 1) {
            // there are no neumes left on the staff
            // remove the custos from the previous staff
            var prevStaff = gui.page.getPreviousStaff(neume.staff);
            if (prevStaff && prevStaff.custos) {
                prevStaff.custos.eraseDrawing();
                prevStaff.removeElementByRef(prevStaff.custos);

                // send the custos delete command to the server to update the underlying MEI
                $.post(gui.prefix + "/edit/" + gui.fileName + "/delete/custos", {id: prevStaff.custos.id})
                .error(function() {
                    // show alert to user
                    // replace text with error message
                    $("#alert > p").text("Server failed to delete custos. Client and server are not synchronized.");
                    $("#alert").animate({opacity: 1.0}, 100);
                });

                prevStaff.custos = null;
            }
        }
        else if (neume == neumesOnStaff[0]) {
            // if this neume is the first neume on the staff
            // update the custos of the previous staff
            var prevStaff = gui.page.getPreviousStaff(neume.staff);
            if (prevStaff && prevStaff.custos) {
                var custos = prevStaff.custos;
                var nextNeume = neumesOnStaff[1];
                var newPname = nextNeume.components[0].pname;
                var newOct = nextNeume.components[0].oct;
                
                var actingClef = prevStaff.getActingClefByEle(custos);
                var newStaffPos = prevStaff.calcStaffPosFromPitch(newPname, newOct, actingClef);

                custos.pname = newPname;
                custos.oct = newOct;
                custos.setRootStaffPos(newStaffPos);

                // the custos has been vertically moved
                // update the custos bounding box information in the model
                // do not need to update pitch name & octave since this does not change
                var outbb = gui.getOutputBoundingBox([custos.zone.ulx, custos.zone.uly, custos.zone.lrx, custos.zone.lry]);
                $.post(gui.prefix + "/edit/" + gui.fileName + "/move/custos",
                      {id: custos.id, pname: newPname, oct: newOct, ulx: outbb[0], uly: outbb[1], lrx: outbb[2], lry: outbb[3]})
                .error(function() {
                    // show alert to user
                    // replace text with error message
                    $("#alert > p").text("Server failed to move custos. Client and server are not synchronized.");
                    $("#alert").animate({opacity: 1.0}, 100);
                });
            }
        }
    };

    var deleteDivision = function(drawing) {
        var division = drawing.eleRef;

        division.staff.removeElementByRef(division);
        toDelete.dids.push(division.id);

        gui.rendEng.canvas.remove(drawing);
        gui.rendEng.canvas.discardActiveObject();
    };

    var selection = gui.rendEng.canvas.getActiveObject();
    if (selection) {
        // ignore the first clef, since this should never be deleted
        if (selection.eleRef instanceof Toe.Model.Clef && selection.eleRef.staff.elements[0] != selection.eleRef) {
            deleteClef(selection);
        }
        else if (selection.eleRef instanceof Toe.Model.Neume) {
            deleteNeume(selection);
        }
        else if (selection.eleRef instanceof Toe.Model.Division) {
            deleteDivision(selection);
        }

        gui.rendEng.repaint();
    }
    else {
        selection = gui.rendEng.canvas.getActiveGroup();
        if (selection) {
            // group of elements selected
            $.each(selection.getObjects(), function(oInd, o) {
                // ignore the first clef, since this should never be deleted
                if (o.eleRef instanceof Toe.Model.Clef && o.eleRef.staff.elements[0] != o.eleRef) {
                    deleteClef(o);
                }
                else if (o.eleRef instanceof Toe.Model.Neume) {
                    deleteNeume(o);
                }
                else if (o.eleRef instanceof Toe.Model.Division) {
                    deleteDivision(o);
                }
            });

            gui.rendEng.canvas.discardActiveGroup();
            gui.rendEng.repaint();
        }
    }

    if (toDelete.clefs.length > 0) {
        // send delete command to the server to change underlying MEI
        $.post(gui.prefix + "/edit/" + gui.fileName + "/delete/clef", {data: JSON.stringify(toDelete.clefs)})
        .error(function() {
            // show alert to user
            // replace text with error message
            $("#alert > p").text("Server failed to delete clef. Client and server are not synchronized.");
            $("#alert").animate({opacity: 1.0}, 100);
        });
    }

    if (toDelete.nids.length > 0) {
        // send delete command to server to change underlying MEI
        $.post(gui.prefix + "/edit/" + gui.fileName + "/delete/neume",  {ids: toDelete.nids.join(",")})
        .error(function() {
            // show alert to user
            // replace text with error message
            $("#alert > p").text("Server failed to delete neume. Client and server are not synchronized.");
            $("#alert").animate({opacity: 1.0}, 100);
        });
    }
    if (toDelete.dids.length > 0) {
        // send delete command to server to change underlying MEI
        $.post(gui.prefix + "/edit/" + gui.fileName + "/delete/division", {ids: toDelete.dids.join(",")})
        .error(function() {
            // show alert to user
            // replace text with error message
            $("#alert > p").text("Server failed to delete division. Client and server are not synchronized.");
            $("#alert").animate({opacity: 1.0}, 100);
        });
    }

    return false;
}