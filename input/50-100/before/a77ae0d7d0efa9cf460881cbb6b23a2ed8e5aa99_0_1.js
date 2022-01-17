function (td) {

        return {

          row: td.parentNode.rowIndex - self.blockedRows.count(),

          col: td.cellIndex - self.blockedCols.count()

        };

      }