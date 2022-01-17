function() {
      if (!isPendingSelection) return;
      isPendingSelection = false;
      
      tableViewCell.didReceiveTap();
      self.selectRowAtIndex(tableViewCell.getIndex());
    }