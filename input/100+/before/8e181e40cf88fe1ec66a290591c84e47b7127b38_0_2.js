function combineResponses(requests, responses, request) {
      // Make an array of array of cells
      var cells = new Array(request.row2 - request.row1 + 1);
      for (var i = cells.length - 1; i >= 0; i--) {
        cells[i] = new Array(request.col2 - request.col1 + 1);
      };

      // Merge the responses in one matrix
      for (var i = responses.length - 1; i >= 0; --i) {
        var currentResponse = responses[i];
        var currentRequest = requests[i];
        for (var j = currentResponse.length - 1; j >= 0; --j) {
          for (var k = currentResponse[j].length - 1; k >= 0; --k) {
            var cell = jQuery('<div/>', {
              className: 'jMatrixBrowse-background-cell',
              'data-row': i + request.row1,
              'data-col': j + request.col1,
              html: currentResponse[j][k]
            });
            if (_config.getDataReloadStrategy === jMatrixBrowseNS.Constants.RELOAD_CELL_POSITION) {
              _elem.find('.jMatrixBrowse-content').append(cell);
              cell.hide();
            }
            cells[j][k] = cell;
          };
        };
      };

      // Add the already existing background cells to the matrix.
      for (var j = request.col1; j <= requests[0].col1; ++j) {
        // If we are at requests[0].col1, we should load only upto request[0].row1 rows from background 
        // Otherwise, we load until request.row2 rows
        for (var i = request.row1; i < ((j == requests[0].col1) ? requests[0].row1 : request.row2); ++i) {
          var cellSelector = '.jMatrixBrowse-background-cell[data-row=' + i + '][data-col=' + j + ']';
          cells[i - request.row1][j - request.col1] = _elem.find(cellSelector);
        };
      };
      return cells;
    }