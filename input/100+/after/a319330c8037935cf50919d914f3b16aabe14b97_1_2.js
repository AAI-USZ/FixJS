function TableView(element) {
  if (!element) return;
  
  var $element = this.$element = $(element);
  var element = this.element = $element[0];
  
  var tableView = element.tableView;
  if (tableView) return tableView;
  
  element.tableView = this;
  
  var scrollViewElement = $element.parents('.sk-scroll-view')[0];
  if (!scrollViewElement) return;
  
  var self = this;
  
  var reusableCells = this._reusableCells = {};
  var visibleCells = this._visibleCells = [];
  var selectedRowIndexes = this._selectedRowIndexes = [];
  
  var scrollView = this.scrollView = scrollViewElement.scrollView;
  var scrollContent = scrollView.getScrollContent();
  
  var containsSearchBar = $element.attr('data-contains-search-bar') || 'false';
  containsSearchBar = containsSearchBar !== 'false';
  
  var searchBar = null;
  if (containsSearchBar) searchBar = this._searchBar = new Pushpop.TableViewSearchBar(this);
  
  var numberOfBufferedCells = this._numberOfBufferedCells;
  var selectionTimeoutDuration = this._selectionTimeoutDuration;
  var lastOffset = -scrollView.y;
  var topMargin = window.parseInt($element.css('margin-top'), 10);
  
  // Render table view cells "virtually" when the view is scrolled.
  scrollView.$element.bind(ScrollKit.ScrollView.EventType.ScrollChange, function(evt) {
    var scrollOffset = scrollView.getScrollOffset();
    var offset = -scrollOffset.y;
    if (offset < 0) return;
    
    var firstCellElement = $element.children('li:first-child')[0];
    var lastCellElement = $element.children('li:last-child')[0];
    if (!firstCellElement || !lastCellElement || firstCellElement === lastCellElement) return;
    
    var dataSource = self.getDataSource();
    var rowHeight = self.getRowHeight();
    var numberOfRows = self._numberOfRows;
    var visibleCellCount = self.getCalculatedNumberOfVisibleCells();
    var selectedRowIndex = self.getIndexForSelectedRow();
    
    var firstCell = firstCellElement.tableViewCell;
    var firstCellIndex = firstCell.getIndex();
    var lastCellIndex = firstCellIndex + visibleCellCount - 1;
    
    // Manually calculate offset instead of calling .offset().
    var margin = scrollContent.getMargin();
    var firstCellOffset = margin.top - offset;
    var lastCellOffset = firstCellOffset + (visibleCellCount * rowHeight);
    var delta = offset - lastOffset;
    var visibleHeight = self.getVisibleHeight();
    
    lastOffset = offset;
    
    var newMarginTopDelta = 0;
    var newMarginBottomDelta = 0;
    
    // Handle scrolling when swiping up (scrolling towards the bottom).
    if (delta > 0 && lastCellIndex + 1 < numberOfRows && firstCellOffset < 0 - (rowHeight * numberOfBufferedCells)) {
      $element.children('li:nth-child(-n+' + numberOfBufferedCells + ')').each(function(index, element) {
        var newCellIndex = lastCellIndex + index + 1;
        if (newCellIndex >= numberOfRows) return;
        
        var cell = element.tableViewCell;
        cell.prepareForReuse();
        
        var newCell = dataSource.getCellForRowAtIndex(self, newCellIndex);
        if (self.isRowSelectedAtIndex(newCellIndex)) newCell.setSelected(true);
        $element.append(newCell.$element);
        
        newMarginTopDelta += rowHeight;
        newMarginBottomDelta -= rowHeight;
      });
      
      scrollContent.setMargin({
        top: margin.top + newMarginTopDelta,
        bottom: margin.bottom + newMarginBottomDelta
      });
    }
    
    // Handle scrolling when swiping down (scrolling towards the top).
    else if (delta < 0 && firstCellIndex - 1 >= 0 && lastCellOffset > visibleHeight + (rowHeight * numberOfBufferedCells)) {
      $element.children('li:nth-child(n+' + (visibleCellCount - numberOfBufferedCells + 1) + ')').each(function(index, element) {
        var newCellIndex = firstCellIndex - index - 1;
        if (newCellIndex < 0) return;
        
        var cell = element.tableViewCell;
        cell.prepareForReuse();
        
        var newCell = dataSource.getCellForRowAtIndex(self, newCellIndex);
        if (self.isRowSelectedAtIndex(newCellIndex)) newCell.setSelected(true);
        $element.prepend(newCell.$element);
        
        newMarginTopDelta -= rowHeight;
        newMarginBottomDelta += rowHeight;
      });
      
      scrollContent.setMargin({
        top: margin.top + newMarginTopDelta,
        bottom: margin.bottom + newMarginBottomDelta
      });
    }
  });
  
  // Handle case when table view is scrolled to the top (e.g.: tapping top of navigation bar).
  scrollView.$element.bind(ScrollKit.ScrollView.EventType.WillScrollToTop, function(evt) {    
    var firstCellElement = $element.children('li:first-child')[0];
    if (firstCellElement) firstCellElement.tableViewCell.setIndex(0);
  }).bind(ScrollKit.ScrollView.EventType.DidScrollToTop, function(evt) { self.reloadData(); });
  
  // Handle mouse/touch events to allow the user to tap accessory buttons.
  var isPendingAccessoryButtonTap = false;

  $element.delegate('span.pp-table-view-cell-accessory', !!('ontouchstart' in window) ? 'touchstart' : 'mousedown', function(evt) {
    isPendingAccessoryButtonTap = true;
  });
  
  $element.delegate('span.pp-table-view-cell-accessory', !!('ontouchmove' in window) ? 'touchmove' : 'mousemove', function(evt) {
    if (!isPendingAccessoryButtonTap) return;
    isPendingAccessoryButtonTap = false;
  });
  
  $element.delegate('span.pp-table-view-cell-accessory', !!('ontouchend' in window) ? 'touchend' : 'mouseup', function(evt) {
    if (!isPendingAccessoryButtonTap) return;
    isPendingAccessoryButtonTap = false;
    
    var tableViewCell = $(this).parent()[0].tableViewCell;
    if (!tableViewCell) return;
    
    $element.trigger($.Event(Pushpop.TableView.EventType.AccessoryButtonTappedForRowWithIndex, {
      tableView: self,
      tableViewCell: tableViewCell,
      index: tableViewCell.getIndex()
    }));
  });
  
  // Handle mouse/touch events to allow the user to tap editing accessory buttons.
  var isPendingEditingAccessoryButtonTap = false;

  $element.delegate('span.pp-table-view-cell-editing-accessory', !!('ontouchstart' in window) ? 'touchstart' : 'mousedown', function(evt) {
    isPendingEditingAccessoryButtonTap = true;
  });
  
  $element.delegate('span.pp-table-view-cell-editing-accessory', !!('ontouchmove' in window) ? 'touchmove' : 'mousemove', function(evt) {
    if (!isPendingEditingAccessoryButtonTap) return;
    isPendingEditingAccessoryButtonTap = false;
  });
  
  $element.delegate('span.pp-table-view-cell-editing-accessory', !!('ontouchend' in window) ? 'touchend' : 'mouseup', function(evt) {
    if (!isPendingEditingAccessoryButtonTap) return;
    isPendingEditingAccessoryButtonTap = false;
    
    var tableViewCell = $(this).parent()[0].tableViewCell;
    if (!tableViewCell) return;
    
    $element.trigger($.Event(Pushpop.TableView.EventType.EditingAccessoryButtonTappedForRowWithIndex, {
      tableView: self,
      tableViewCell: tableViewCell,
      index: tableViewCell.getIndex()
    }));
  });
  
  // Handle mouse/touch events to allow the user to make row selections.
  var isPendingSelection = false, selectionTimeout = null;

  $element.delegate('li', !!('ontouchstart' in window) ? 'touchstart' : 'mousedown', function(evt) {
    
    // Don't allow row to be selected if an accessory button is pending a tap.
    if (isPendingAccessoryButtonTap || isPendingEditingAccessoryButtonTap) return;
    
    isPendingSelection = true;
    
    var tableViewCell = this.tableViewCell;
    
    selectionTimeout = window.setTimeout(function() {
      if (!isPendingSelection) return;
      isPendingSelection = false;
      
      self.selectRowAtIndex(tableViewCell.getIndex());
    }, selectionTimeoutDuration);
  });
  
  $element.bind(!!('ontouchmove' in window) ? 'touchmove' : 'mousemove', function(evt) {
    if (!isPendingSelection) return;
    isPendingSelection = false;
    
    window.clearTimeout(selectionTimeout);
  });
  
  $element.delegate('li', !!('ontouchend' in window) ? 'touchend' : 'mouseup', function(evt) {
    if (!isPendingSelection) return;
    isPendingSelection = false;
    
    window.clearTimeout(selectionTimeout);
    self.selectRowAtIndex(this.tableViewCell.getIndex());
  });
  
  // Create a new data source from a data set URL.
  var dataSetUrl = $element.attr('data-set-url');
  if (dataSetUrl) {
    $.getJSON(dataSetUrl, function(dataSet) {
      $element.html(null);
      self.setDataSource(new Pushpop.TableViewDataSource(dataSet));
    });
  }
  
  // Create a new data source from existing <li/> elements.
  else {
    (function(self, $element) {
      var dataSet = [];
      
      var dashAlpha = /-([a-z]|[0-9])/ig;
      var camelCase = function(string) { return string.replace(dashAlpha, function(all, letter) { return (letter + '').toUpperCase(); }); };
      
      $element.children('li').each(function(index, element) {
        var data = { title: $(element).html() };
        
        var attributes = element.attributes;
        var attribute, attributeName;
        for (var i = 0, length = attributes.length; i < length; i++) {
          attribute = attributes[i];
          attributeName = attribute.name;
          
          if (attributeName.indexOf('data-') === 0) data[camelCase(attributeName.substring(5))] = attribute.value;
        }
        
        if (!data['reuseIdentifier']) data.reuseIdentifier = 'pp-table-view-cell-default';
      
        dataSet.push(data);
      });
      
      $element.html(null);
      self.setDataSource(new Pushpop.TableViewDataSource(dataSet));
    })(self, $element);
  }
}