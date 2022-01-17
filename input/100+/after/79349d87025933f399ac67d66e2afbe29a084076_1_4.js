function (row, col) {
            // Stop if the cell isalready selected or if this cell has a mine
            // count > 0
            if (board[row][col].selected) {
                return;
            } else if (board[row][col].mineCount > 0 ||
                       board[row][col].cellType == 'mine') {
                board[row][col].selected = true;
                return;
            }

            board[row][col].selected = true;

            if (row - 1 >= 0 && col - 1 >= 0) {
                my.activateCell(row - 1, col - 1);
            }

            if (row - 1 >= 0) {
                my.activateCell(row - 1, col);
            }

            if (row - 1 >= 0 && col + 1 < boardSize) {
                my.activateCell(row - 1, col + 1);
            }

            if (col - 1 >= 0) {
                my.activateCell(row, col - 1);
            }

            if (col + 1 < boardSize) {
                my.activateCell(row, col + 1);
            }

            if (row + 1 < boardSize && col - 1 >= 0) {
                my.activateCell(row + 1, col - 1);
            }

            if (row + 1 < boardSize) {
                my.activateCell(row + 1, col);
            }

            if (row + 1 < boardSize && col + 1 < boardSize) {
                my.activateCell(row + 1, col + 1);
            }
        }