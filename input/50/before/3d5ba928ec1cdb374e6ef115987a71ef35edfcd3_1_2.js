function (dbURL) {
      self.rawDDocIdCell.setValue(ddocId);
      self.rawViewNameCell.setValue(undefined);
      self.rawSpatialNameCell.setValue(spatialName);
      SpatialFilter.initFilterFor(buildDocURL(dbURL, ddocId, "_spatial", spatialName));
    }