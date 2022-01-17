function deleteLast() {
                if (ui.keyboardPlacements.length) {
                    var lastPlacement = ui.keyboardPlacements.pop();
                    var rackSquare = lastPlacement[0];
                    var boardSquare = lastPlacement[1];
                    if (!rackSquare.tile && boardSquare.tile) {
                        ui.moveTile(boardSquare, rackSquare);
                        ui.setCursor(boardSquare);
                    } else {
                        ui.keyboardPlacements = [];         // user has moved stuff around, forget keyboard entry
                    }
                }
                handled();
            }