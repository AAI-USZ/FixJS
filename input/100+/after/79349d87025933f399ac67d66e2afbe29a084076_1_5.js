function (row, col) {
            var count = 0,
                r,
                c;

            for (r = row - 1; r <= row + 1; r += 1) {
                for (c = col - 1; c <= col + 1; c += 1) {
                    if (r >= 0 && 
                        c >= 0 &&
                        r < boardSize &&
                        c < boardSize && 
                        !(r == row && c == col) &&
                        board[r][c].cellType == 'mine') {
                        count += 1;
                    }
                }
            }

            return count;
        }