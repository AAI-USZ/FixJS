function (rowDelta, colDelta, force) {

        if (priv.selStart.row + rowDelta > self.rowCount - 1) {

          if (force && priv.settings.minSpareRows > 0) {

            self.alter("insert_row", self.rowCount);

          }

          else if (priv.selStart.col + colDelta < self.colCount - 1) {

            rowDelta = 1 - self.rowCount;

            colDelta = 1;

          }

        }

        else if (priv.selStart.row + rowDelta < 0 && priv.selStart.col + colDelta >= 0) {

          rowDelta = self.rowCount - 1;

          colDelta = -1;

        }

        if (priv.selStart.col + colDelta > self.colCount - 1) {

          if (force && priv.settings.minSpareCols > 0) {

            self.alter("insert_col", self.colCount);

          }

          else if (priv.selStart.row + rowDelta < self.rowCount - 1) {

            rowDelta = 1;

            colDelta = 1 - self.colCount;

          }

        }

        else if (priv.selStart.col + colDelta < 0 && priv.selStart.row + rowDelta >= 0) {

          rowDelta = -1;

          colDelta = self.colCount - 1;

        }

        var td = grid.getCellAtCoords({

          row: (priv.selStart.row + rowDelta),

          col: priv.selStart.col + colDelta

        });

        if (td) {

          selection.setRangeStart(td);

        }

        else {

          selection.setRangeStart(grid.getCellAtCoords(priv.selStart)); //rerun some routines

        }

      }