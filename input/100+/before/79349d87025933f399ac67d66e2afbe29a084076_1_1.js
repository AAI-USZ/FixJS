function (e) {
                var pos,
                    row,
                    i,
                    j,
                    cell;

                if (!e) var e = event;

                pos = {
                    x: e.pageX - canvas.offsetLeft,
                    y: e.pageY - canvas.offsetTop
                };

                for (i = 0; i < boardSize; i += 1) {
                    for (j = 0; j < boardSize; j += 1) {
                        cell = board[i][j];

                        if (cell.inBounds(pos)) {
                            if (e.shiftKey) {
                                cell.flagged = true;
                                cell.flaggedImage = resourcesManager.images['flag'];
                            } else {
                                cell.highlighted = true;
                                highlightedCell = cell;
                            }
                        }
                    }
                }
            }