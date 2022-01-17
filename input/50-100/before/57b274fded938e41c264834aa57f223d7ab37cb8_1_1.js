function(evt) {
    if (!isPendingAccessoryButtonTap) return;
    isPendingAccessoryButtonTap = false;
    
    var tableViewCell = $(this).parent()[0].tableViewCell;
    if (!tableViewCell) return;
    
    $element.trigger($.Event(Pushpop.TableView.EventType.AccessoryButtonTappedForRowWithIndex, {
      tableView: self,
      tableViewCell: tableViewCell,
      index: tableViewCell.getIndex()
    }));
  }