function init(elem) {
      
      _elem = elem;
      
      // Initialize mock api
      _api = jMatrixBrowseNs.APIHandler('test');
      
      // Initialize configuration, get user options and extend with default.
      _configuration = jMatrixBrowseNs.Configuration(elem, _api);
      
      // Initialize the jMatrixBrowseRenderer
      _renderer = jMatrixBrowseNs.jMatrixBrowseRenderer(elem, _configuration, _api);

      // Load data
      //_self.reloadData();
      
      // Listen to events to implement reloading of data and headers
      
      // Listen for drag and reposition cells
      _elem.bind('jMatrixBrowseDrag', function (event) {
        // Reposition matrix cells
        checkAndRepositionCells();  
        // Reposition headers
        checkAndRepositionHeaders();
      });
      
      // Listen for drag stop and reposition cells, needed when there is a quick drag.
      _elem.bind('jMatrixBrowseDragStop', function (event) {
        // Reposition matrix cells
        checkAndRepositionCells();  
        // Reposition headers
        checkAndRepositionHeaders();
      });
      
      // Listen for change and reload new data
      _elem.bind('jMatrixBrowseChange', function (event) {
        reloadData({
          currentCell: event.currentCell,
          previousCell: event.previousCell,
          direction: event.direction
        });
        
        console.log('jMatrixBrowseChange'); 
        console.log(event);
      });
      
      // Listen for click event
      _elem.bind('jMatrixBrowseClick', function (event) {
        console.log('click: ' + event.row + ', ' + event.col);
      });
    }