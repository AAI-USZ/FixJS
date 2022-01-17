function(index, animated) {
    var dataSource = this.getDataSource();
    var shouldSelectRowAtIndex = dataSource.shouldSelectRowAtIndex(index);
    if (!shouldSelectRowAtIndex) return;
    
    this.deselectAllRows();
    
    var $element = this.$element;
    this._selectedRowIndexes.push(index);
    
    var tableViewCell, $cells = this.$element.children();
    for (var i = 0, length = $cells.length; i < length; i++) {
      tableViewCell = $cells[i].tableViewCell;
      if (tableViewCell.getIndex() === index) {
        tableViewCell.setSelected(true);
        break;
      }
    }
    
    // If this row contains a child data source, automatically push a new dynamic table view with it.
    if (dataSource.rowHasChildDataSourceAtIndex(index)) {
      var childDataSource = dataSource.getChildDataSourceForRowAtIndex(index);
      var viewStack = this.getViewStack();
      var self = this;
      
      if (childDataSource && viewStack) {
        viewStack.pushNewTableView(function(childTableView) {
          if (self.getSearchBar()) childTableView.setSearchBar(new Pushpop.TableViewSearchBar(childTableView));
          childTableView.setDataSource(childDataSource);
          childTableView.setParentTableView(self);
        });
        
        // Trigger the DidSelectRowAtIndex event on this and all parent table view elements.
        this.triggerEventOnParentTableViews($.Event(Pushpop.TableView.EventType.DidSelectRowAtIndex, {
          tableView: this,
          index: index,
          item: dataSource.getItemAtIndex(index),
          hasChildDataSource: true
        }), true);
        
        return;
      }
    }
    
    // Trigger the DidSelectRowAtIndex event on this and all parent table view elements.
    this.triggerEventOnParentTableViews($.Event(Pushpop.TableView.EventType.DidSelectRowAtIndex, {
      tableView: this,
      index: index,
      item: dataSource.getItemAtIndex(index),
      hasChildDataSource: false
    }), true);
  }