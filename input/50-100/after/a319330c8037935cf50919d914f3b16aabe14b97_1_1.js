function(evt) {    
    var firstCellElement = $element.children('li:first-child')[0];
    if (firstCellElement) firstCellElement.tableViewCell.setIndex(0);
  }).bind(ScrollKit.ScrollView.EventType.DidScrollToTop, function(evt) { self.reloadData(); }