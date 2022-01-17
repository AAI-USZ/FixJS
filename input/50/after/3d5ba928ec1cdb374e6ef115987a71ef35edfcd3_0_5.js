function (e) {
      e.preventDefault();
      self.documentIdCell.setValue(undefined);
      self.lookupIdCell.setValue(undefined);
      self.filter.rawFilterParamsCell.setValue(undefined);
    }