function place_updateScreenshot(uri, screenshot, callback) {
    this.db.getPlaceUrisByFrecency(this.TOP_SITE_SCREENSHOTS,
      (function(topSites) {
      // If uri is not one of the top sites, don't store the screenshot
      if (topSites.indexOf(uri) == -1)
        return;

      this.db.updatePlaceScreenshot(uri, screenshot);
    }).bind(this));
  }