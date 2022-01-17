function (coords) {

        var r = 0;

        if (!coords || coords.col >= self.colCount) {

          for (; r < self.rowCount; r++) {

            datamap.data[r].push('');

          }

        }

        else {

          for (; r < self.rowCount; r++) {

            datamap.data[r].splice(coords.col, 0, '');

          }

        }

      }