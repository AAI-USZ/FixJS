function (start, input, end, allowHtml) {
        var r, rlen, c, clen, td, endTd, changes = [], current = {};
        rlen = input.length;
        if (rlen === 0) {
          return false;
        }
        current.row = start.row;
        current.col = start.col;
        for (r = 0; r < rlen; r++) {
          if ((end && current.row > end.row) || (!priv.settings.minSpareRows && current.row > self.rowCount - 1)) {
            break;
          }
          current.col = start.col;
          clen = input[r] ? input[r].length : 0;
          for (c = 0; c < clen; c++) {
            if ((end && current.col > end.col) || (!priv.settings.minSpareCols && current.col > self.colCount - 1)) {
              break;
            }
            td = grid.getCellAtCoords(current);
            if (grid.isCellWritable($(td))) {
              changes.push([current.row, current.col, datamap.get(current.row, current.col), input[r][c]]);
            }
            current.col++;
            if (end && c === clen - 1) {
              c = -1;
            }
          }
          current.row++;
          if (end && r === rlen - 1) {
            r = -1;
          }
        }
        if (priv.settings.onBeforeChange && changes.length) {
          var result = priv.settings.onBeforeChange(changes);
          if (result === false) {
            return grid.getCellAtCoords(start);
          }
        }
        var setData = [];
        for (var i = 0, ilen = changes.length; i < ilen; i++) {
          if (end && (changes[i][0] > end.row || changes[i][1] > end.col)) {
            continue;
          }
          if (changes[i][3] === false) {
            continue;
          }
          setData.push([changes[i][0], changes[i][1], changes[i][3]]);
        }
        endTd = self.setDataAtCell(0, 0, setData, allowHtml);
        if (changes.length) {
          self.container.triggerHandler("datachange.handsontable", [changes, 'populateFromArray']);
        }
        return endTd || grid.getCellAtCoords(start);
      }