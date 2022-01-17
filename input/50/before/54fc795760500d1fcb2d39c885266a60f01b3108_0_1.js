function() {
      if (!isPendingSelection) return;
      isPendingSelection = false;
      
      self.selectRowAtIndex(tableViewCell.getIndex());
    }