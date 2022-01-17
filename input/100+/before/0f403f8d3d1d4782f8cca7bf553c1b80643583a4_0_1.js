function(index, animated) {
    var dataSource = this.getDataSource();
    var shouldSelectRowAtIndex = dataSource.shouldSelectRowAtIndex(index);
    if (!shouldSelectRowAtIndex) return;
    
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
    
    $element.trigger($.Event(Pushpop.TableView.EventType.DidSelectRowAtIndex, {
      tableView: this,
      index: index
    }));
  }