function (row, col, val) {
        var td = grid.getCellAtCoords({row: row, col: col}),
            $td = $(td),
            oldVal = datamap.get(row, col);
        if (oldVal !== val && grid.isCellWritable($td)) {
          var result;
          var change = [row, col, oldVal, val];
          if (priv.settings.onBeforeChange) {
            result = priv.settings.onBeforeChange(change);
          }
          if (result !== false && change[3] !== false) { //edit is not cancelled
            self.setDataAtCell(change[0], change[1], change[3]);
          }
        }
        return change;
      }