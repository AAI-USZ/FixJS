function(evt) {
    if (!isPendingEditingAccessoryButtonTap) return;
    isPendingEditingAccessoryButtonTap = false;
    
    var tableViewCell = $(this).parent()[0].tableViewCell;
    if (!tableViewCell) return;
    
    var index = tableViewCell.getIndex();
    
    $element.trigger($.Event(Pushpop.TableView.EventType.EditingAccessoryButtonTappedForRowWithIndex, {
      tableView: self,
      tableViewCell: tableViewCell,
      index: index,
      item: self.getDataSource().getItemAtIndex(index)
    }));
  }