function (e) {
                var pos,
                    row,
                    i,
                    j,
                    cell,
                    touch;

                e.preventDefault();

                pos = {
                    x: e.targetTouches[0].pageX - canvas.offsetLeft,
                    y: e.targetTouches[0].pageY - canvas.offsetTop
                };

                for (i = 0; i < boardSize; i += 1) {
                    for (j = 0; j < boardSize; j += 1) {
                        cell = board[i][j];

                        if (cell.inBounds(pos)) {
                            if (e.shiftKey) {
                                cell.flagged = true;
                                cell.flaggedImage = resourceManager.images.flag;
                            } else {
                                cell.highlighted = true;
                                highlightedCell = cell;
                            }
                        }
                    }
                }
            }