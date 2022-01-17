function(ncInd, nc) {
            var newPunct = new Toe.Model.Neume();
            newPunct.components.push(nc);

            var uly = o.eleRef.staff.zone.uly - (o.eleRef.rootStaffPos + nc.pitchDiff)*o.eleRef.staff.delta_y/2 - gui.punctHeight/2;
            // set the bounding box hint of the new neume for drawing
            var bb = [ulx+(ncInd*gui.punctWidth), uly, ulx+((ncInd+1)*gui.punctWidth), uly+gui.punctHeight];
            newPunct.setBoundingBox(bb);

            // instantiate neume view and controller
            var nView = new Toe.View.NeumeView(gui.rendEng);
            var nCtrl = new Toe.Ctrl.NeumeController(newPunct, nView);

            // add the punctum to the staff and draw it
            o.eleRef.staff.addNeume(newPunct);

            // get final bounding box information
            var outbb = gui.getOutputBoundingBox([newPunct.zone.ulx, newPunct.zone.uly, newPunct.zone.lrx, newPunct.zone.lry]);
            punctBoxes.push({"ulx": outbb[0], "uly": outbb[1], "lrx": outbb[2], "lry": outbb[3]});

            punctums.push(newPunct);
        }