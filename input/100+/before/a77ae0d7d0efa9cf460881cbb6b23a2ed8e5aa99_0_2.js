function (rowDelta, colDelta, force) {

        if (force && priv.selStart.row + rowDelta > self.rowCount - 1) {

          self.alter("insert_row", self.rowCount);

        }

        if (force && priv.selStart.col + colDelta > self.colCount - 1) {

          self.alter("insert_col", self.colCount);

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