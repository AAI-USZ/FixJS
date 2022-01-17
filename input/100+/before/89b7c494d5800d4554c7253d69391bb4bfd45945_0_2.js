function(config, pager) {
  var _queryData;
  var _sortKey = '';
  var _sortOrder = '';
  var _pageSize = 10;
  var _pageIndex = 0;
  var _config = config;
  var _pager = pager;
  var _queryDataKeys = config.queryDataKeys   // The data that has to be fetched
                                             // from the queryData
  
  // Creates an ordered index of the JSON
  function createOrderedIndex() {
    var arr = new Array();
    var sortKey;
    for (var i = 0; i < _queryData.length; i++) {
      if (typeof(_queryData[i]['properties'][_sortKey]) != 'undefined') {
        sortKey = _queryData[i]['properties'][_sortKey];
      } else if (typeof(_queryData[i]['values'][_sortKey]) != 'undefined') {
        sortKey = _queryData[i]['values'][_sortKey];
      } else {
        sortKey = '';
      }
      arr.push([i, sortKey]);
    }
    if (_sortKey != '') {
      arr.sort(sortMultiDimensionalArray);
    }
    if (_sortOrder == 'desc') {
      arr.reverse();
    }
    return arr;
  }
  
  // Sort multi-dimensional array by its second item
  function sortMultiDimensionalArray(a, b) {
    return ((a[1] < b[1]) ? -1 : ((a[1] > b[1]) ? 1 : 0));
  }
  
  // Returns an object with relevant search results, based on the JSON reply
  // from the server.
  function getResultsData(orderedIndex) {
    var resultBatch = {};
    var data;
    var item;
    var evalStr;
    
    resultBatch.items = new Array();
    for (var i = 0; i < orderedIndex.length; i++) {
      data = {};
      item = _queryData[orderedIndex[i][0]];
      // Set default values
      data.id = (item.values.id) ? item.values.id : '';
      data.title = (item.values.title) ? item.values.title : '';
      for (var ii = 0; ii < _queryDataKeys.length; ii++) {
        // Search for specific items in the JSON from the server and store
        // them in the results batch.
        try {
          evalStr = 'data.' + getKey(_queryDataKeys[ii]) + ' = item.' +
                    _queryDataKeys[ii];
          eval(evalStr);
        }
        catch(e) {};
      }
      resultBatch.items.push(data);
    }
    
    return resultBatch;
    
    function getKey(str) {
      return str.replace('.', '_');
    }
  }
  
  // Creates the results list HTML and generates the paging.
  function buildList() {
    // Sort search results and get the right page batch
    var orderedIndex = createOrderedIndex();
    var sliceStart = (_pageIndex * _pageSize);
    orderedIndex = orderedIndex.slice(sliceStart, sliceStart + _pageSize);
    
    // Create JSON that will get rendered with Mustache template
    var results = getResultsData(orderedIndex);
    results.total = _queryData.length;
    results.totalRender = function() {
      return function(text) {
        if (_queryData.length > 1) {
          return text + " " + _config.labels.totalPlural;
        } else if (_queryData.length <= 1) {
         return text + " " + _config.labels.totalSingular;
        }
      }
    }
    var listHtml = Mustache.render(_config.listTemplate, results);
    _config.list.html(listHtml);
    
    // Make sure screen readers will update users of changes in the DOM
    _config.list.attr('aria-live', 'assertive');
    
    // Create pager
    _pager.page(_pageIndex, _queryData.length, _pageSize);
  }
  
  // Set defaults if not set already
  function setDefaultVariables() {
    var controls
    if (!_sortOrder) {
      _sortOrder = 'asc';
    }
    if (!_sortKey) {
      if (config.listOrderData.length > 0) {
        _sortKey = graphite.blocks.navigation.resultsFilter.list.controls
                     .orderKeyName(config.listOrderData[0].key);
      }
    }
    if (!_pageSize) {
      if (config.listBatchSizes.length > 0) {
        _pageSize = config.listBatchSizes[0];
      }
    }
  }

  
  
  
  /**
   * Builds new list of search results based on the queryData and stored filter
   * preferences.
   * 
   * @param {Object} queryData A JSON with the search results in raw JSON.
   * @param {String} sortKey A key name of items in the raw JSON. That key
   *    is used to sort the list.
   * @param {String} sortOrder Sets order type: 'asc' or 'desc'.
   * @param {String} pageIndex Sets the paging index.
   */
  this.build = function(queryData, sortKey, sortOrder, pageSize, pageIndex) {
    // Store arguments as local variable
    if (queryData) {
      _queryData = queryData;
    }
    if (sortOrder) {
      _sortOrder = sortOrder;
    }
    if (sortKey) {
      _sortKey = sortKey;
    }
    if (pageSize) {
      _pageSize = pageSize;
    }
    _pageIndex = (pageIndex) ? pageIndex : 0;
    
    setDefaultVariables();
    
    // Build the results list
    buildList(_queryData);
  }
}