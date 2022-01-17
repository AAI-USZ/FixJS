function(e) {
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
                $.post(gui.apiprefix + "/move/custos", {id: e.id, ulx: outbb[0], uly: outbb[1], lrx: outbb[2], lry: outbb[3]})
                .error(function() {
                    // show alert to user
                    // replace text with error message
                    $("#alert > p").text("Server failed to move custos. Client and server are not synchronized.");
                    $("#alert").animate({opacity: 1.0}, 100);
                });
            }
        }