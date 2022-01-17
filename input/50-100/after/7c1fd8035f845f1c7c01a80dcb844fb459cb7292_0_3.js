function (coords) {

        var row = [];

        for (var c = 0; c < self.colCount; c++) {

          row.push('');

        }

        if (!coords || coords.row >= self.rowCount) {

          datamap.data.push(row);

        }

        else {

          datamap.data.splice(coords.row, 0, row);

        }

      }