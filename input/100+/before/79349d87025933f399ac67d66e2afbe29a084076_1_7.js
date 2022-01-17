function () {
            var row,
                i,
                j,
                mineCell;

            for (i = 0; i < boardSize; i += 1) {
                row = [];

                for (j = 0; j < boardSize; j += 1) {
                    row[j] = cell({
                        x: j * cellWidth,
                        y: i * cellHeight,
                        width: cellWidth,
                        height: cellHeight,
                        image: resourcesManager.images['cell'],
                        highlightedImage: resourcesManager.images['cell_0']
                    });
                }

                board[i] = row;
            }

            // Setup the mines
            for (i = 0; i < numOfMines; i += 1) {
                mineCell = board[Math.floor(Math.random()*boardSize)][Math.floor(Math.random()*boardSize)];
                mineCell.cellType = 'mine';
                mineCell.selectedImage = resourcesManager.images['mine'];
                
            }

            my.assignMineCounts();
        }