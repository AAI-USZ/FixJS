function (sec, tabsVal, spatialVal, viewsVal) {
      if (sec !== 'views') {
        return;
      }
      if (!tabsVal) {
        return;
      }

      if (!spatialVal) {
        var filterParams = "bbox=-180,-90,180,90";
        filterParams += tabsVal === 'production' ? "&stale=update_after&connection_timeout=60000" : "&connection_timeout=60000";
        SpatialFilter.rawFilterParamsCell.setValue(filterParams);
      }

      if (!viewsVal) {
        ViewsFilter.rawFilterParamsCell.setValue(tabsVal === 'production' ? "stale=update_after&connection_timeout=60000" : "connection_timeout=60000");
      }
    }