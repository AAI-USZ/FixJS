function(msg) {
    if (ThumbnailZoomPlus.getPref(this.PREF_PANEL_DEBUG, false)) {
      this._logToConsole(msg);
    }
  }