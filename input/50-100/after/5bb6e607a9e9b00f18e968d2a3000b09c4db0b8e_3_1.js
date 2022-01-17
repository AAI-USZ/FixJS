function () {
    // adjust for an accuracy vs. drawing speed sweet spot (more accuracy makes drawing markers slower)
    // 1 == perfect accuracy, 2 == every other pixel, etc. Integers only, please!
    this.interactionResolution = 2;
    this._featureMap = {};
    this._initializeIcons();
    this._allRequests = [];
    this._markerPoolSize = Config.maxMarkers || 500;
    this._currentPopup = null;
    this._mapped = {}; // points that have been displayed on the map
  }