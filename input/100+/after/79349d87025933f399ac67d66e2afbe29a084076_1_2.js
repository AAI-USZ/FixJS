function (e) {
                e.preventDefault();

                var pos,
                    row,
                    i,
                    j,
                    cell;

                pos = {
                    x: e.changedTouches[0].pageX - canvas.offsetLeft,
                    y: e.changedTouches[0].pageY - canvas.offsetTop
                };

                for (i = 0; i < boardSize; i += 1) {
                    for (j = 0; j < boardSize; j += 1) {
                        cell = board[i][j];

                        if (cell.inBounds(pos)) {

                            // Active the cell if it was the one we were highlighting
                            if (cell.highlighted) {
                                cell.highlighted = false;
                                my.activateCell(i, j);
                            }

                            highlightedCell = null;
                        }
                    }
                }
            }