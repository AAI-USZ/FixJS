function(evt) {
    if (!isPendingEditingAccessoryButtonTap) return;
    isPendingEditingAccessoryButtonTap = false;
    
    var tableViewCell = $(this).parent()[0].tableViewCell;
    if (!tableViewCell) return;
    
    $element.trigger($.Event(Pushpop.TableView.EventType.EditingAccessoryButtonTappedForRowWithIndex, {
      tableView: self,
      tableViewCell: tableViewCell,
      index: tableViewCell.getIndex()
    }));
  }