function (coords) {

        if (coords.row < 0 || coords.col < 0) {

          return null;

        }

        var tr = priv.tableBody.childNodes[coords.row];

        if (tr) {

          return tr.childNodes[coords.col + self.blockedCols.count()];

        }

        else {

          return null;

        }

      }