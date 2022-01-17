function (e) {
      e.preventDefault();
      self.documentIdCell.setValue(undefined);
      self.currentPageDocsCell.invalidate();
    }