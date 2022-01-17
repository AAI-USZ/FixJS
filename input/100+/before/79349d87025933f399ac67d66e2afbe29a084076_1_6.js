function () {
            var i,
                j,
                mineCount;

            for (i = 0; i < boardSize; i += 1) {
                for (j = 0; j < boardSize; j += 1) {
                    if (board[i][j].cellType != 'mine') {
                        mineCount = my.getMineCount(i, j);
                        board[i][j].mineCount = mineCount;
                        board[i][j].selectedImage = resourcesManager.images['cell_' + mineCount];
                    };
                }
            }
        }