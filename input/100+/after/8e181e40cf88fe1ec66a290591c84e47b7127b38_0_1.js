function getRequiredRequests(request) {
      var requests = [];
      var notAllCellsExist = false;
      for (var j = request.col1; j <= request.col2; ++j) {
        for (var i = request.row1; i <= request.row2; ++i) {
          var cellSelector = '.jMatrixBrowse-background-cell[data-row=' + i + '][data-col=' + j + ']';
          if (_elem.find(cellSelector).length == 0) {
            // This row doesn't exist
            // Since we were loading columnwise, we know that all elements after i,j don't exist.
            requests.push({
              row1: i,
              col1: j,
              row2: request.row2,
              col2: request.col2
            });
            notAllCellsExist = true;
            break;
          }
        }
        if (notAllCellsExist)
          break;
      }
      if (notAllCellsExist) {
        if (i > request.row1 && i < request.row2 && j > request.col1 && j < request.col2) {
          requests.push({
            row1: request.row1,
            col1: j+1,
            row2: i-1,
            col2: request.col2
          });
        }
      }
      return requests;
    }