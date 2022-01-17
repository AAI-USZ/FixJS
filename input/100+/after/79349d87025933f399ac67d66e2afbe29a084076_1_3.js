function () {
            // Bind event handlers
            canvas.addEventListener('touchstart', function (e) {
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
            }, false);

            canvas.addEventListener('touchend', function (e) {
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
            }, false);

            canvas.addEventListener('touchmove', function (e) {
                e.preventDefault();

                var pos = {
                    x: e.pageX - canvas.offsetLeft,
                    y: e.pageY - canvas.offsetTop
                };

                if (highlightedCell) {
                    // If we moved out of the highlighted cell, unhighlight it
                    if (!highlightedCell.inBounds(pos)) {
                        highlightedCell.highlighted = false;
                        highlightedCell = null;
                    }
                }
            }, false);

            resourceManager.loadImages({
                'mine': 'resources/mine.png',
                'cell': 'resources/cell.png',
                'flag': 'resources/flag.png',
                'cell_0': 'resources/cell_0.png',
                'cell_1': 'resources/cell_1.png',
                'cell_2': 'resources/cell_2.png',
                'cell_3': 'resources/cell_3.png',
                'cell_4': 'resources/cell_4.png',
                'cell_5': 'resources/cell_5.png'
            }, function () {
                // images loaded
                my.start();
            });
        }