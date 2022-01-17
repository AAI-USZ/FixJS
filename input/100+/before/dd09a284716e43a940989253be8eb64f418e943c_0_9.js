function(drawing) {
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
    }