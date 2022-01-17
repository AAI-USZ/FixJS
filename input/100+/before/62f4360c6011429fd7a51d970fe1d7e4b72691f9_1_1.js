function (action, coords, toCoords) {
        var oldData, newData, changes, r, rlen, c, clen, result;
        oldData = $.extend(true, [], datamap.getAll());

        switch (action) {
          case "insert_row":
            datamap.createRow(coords);
            grid.createRow(coords);
            self.blockedCols.refresh();
            break;

          case "insert_col":
            datamap.createCol(coords);
            grid.createCol(coords);
            self.blockedRows.refresh();
            break;

          case "remove_row":
            datamap.removeRow(coords, toCoords);
            grid.removeRow(coords, toCoords);
            result = grid.keepEmptyRows();
            if (!result) {
              self.blockedCols.refresh();
            }
            if (priv.selStart.row > coords.row) {
              priv.selStart.row = priv.selStart.row - (toCoords.row - coords.row + 1);
            }
            if (priv.selEnd.row > coords.row) {
              selection.transformEnd(-(toCoords.row - coords.row + 1), 0);
            }
            else {
              selection.transformEnd(0, 0);
            }
            break;

          case "remove_col":
            datamap.removeCol(coords, toCoords);
            grid.removeCol(coords, toCoords);
            result = grid.keepEmptyRows();
            if (!result) {
              self.blockedRows.refresh();
            }
            if (priv.selStart.col > coords.col) {
              priv.selStart.col = priv.selStart.col - (toCoords.col - coords.col + 1);
            }
            if (priv.selEnd.col > coords.col) {
              selection.transformEnd(0, -(toCoords.col - coords.col + 1));
            }
            else {
              selection.transformEnd(0, 0);
            }
            break;
        }

        changes = [];
        newData = datamap.getAll();
        for (r = 0, rlen = newData.length; r < rlen; r++) {
          for (c = 0, clen = newData[r].length; c < clen; c++) {
            changes.push([r, c, oldData[r] ? oldData[r][c] : null, newData[r][c]]);
          }
        }
        self.container.triggerHandler("datachange.handsontable", [changes, 'alter']);
      }