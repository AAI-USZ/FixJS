function(e) {
        var coords = {x: gui.punctDwg.left, y: gui.punctDwg.top};
        var sModel = gui.page.getClosestStaff(coords);

        // instantiate a punctum
        var nModel = new Toe.Model.Neume();

        // calculate snapped coords
        var snapCoords = sModel.ohSnap(coords, gui.punctDwg.currentWidth);

        // update bounding box with physical position on the page
        var ulx = snapCoords.x - gui.punctDwg.currentWidth/2;
        var uly = snapCoords.y - gui.punctDwg.currentHeight/2;
        var bb = [ulx, uly, ulx + gui.punctDwg.currentWidth, uly + gui.punctDwg.currentHeight];
        nModel.setBoundingBox(bb);

        // get pitch name and octave of snapped coords of note
        var noteInfo = sModel.calcPitchFromCoords(snapCoords);
        var pname = noteInfo["pname"];
        var oct = noteInfo["oct"];

        //  start forming arguments for the server function call
        var args = {pname: pname, oct: oct};

        // check ornamentation toggles to add to component
        var ornaments = new Array();
        if (hasDot) {
            ornaments.push(new Toe.Model.Ornament("dot", {form: "aug"}));
            args["dotform"] = "aug";
        }
        
        /* TODO: deal with episemata
        if (hasHorizEpisema) {
        }
        if (hasVertEpisema) {
        }
        */

        nModel.addComponent("punctum", pname, oct, {ornaments: ornaments});

        // instantiate neume view and controller
        var nView = new Toe.View.NeumeView(gui.rendEng);
        var nCtrl = new Toe.Ctrl.NeumeController(nModel, nView);
        
        // mount neume on the staff
        var nInd = sModel.addNeume(nModel);

        // if this is the first neume on a staff, update the custos of the next staff
        if (nInd == 1) {
            var prevStaff = gui.page.getPreviousStaff(sModel);
            if (prevStaff) {
                gui.handleUpdatePrevCustos(pname, oct, prevStaff);
            }
        }

        // now that final bounding box is calculated from the drawing
        // add the bounding box information to the server function arguments
        var outbb = gui.getOutputBoundingBox([nModel.zone.ulx, nModel.zone.uly, nModel.zone.lrx, nModel.zone.lry]);
        args["ulx"] = outbb[0];
        args["uly"] = outbb[1];
        args["lrx"] = outbb[2];
        args["lry"] = outbb[3];

        // get next element to insert before
        if (nInd + 1 < sModel.elements.length) {
            args["beforeid"] = sModel.elements[nInd+1].id;
        }
        else {
            // insert before the next system break (staff)
            var sNextModel = gui.page.getNextStaff(sModel);
            if (sNextModel) {
                args["beforeid"] = sNextModel.id;
            }
        }

        // send insert command to server to change underlying MEI
        $.post(gui.apiprefix + "/insert/neume", args, function(data) {
            nModel.id = JSON.parse(data).id;
        })
        .error(function() {
            // show alert to user
            // replace text with error message
            $("#alert > p").text("Server failed to insert neume. Client and server are not synchronized.");
            $("#alert").animate({opacity: 1.0}, 100);
        });
    }