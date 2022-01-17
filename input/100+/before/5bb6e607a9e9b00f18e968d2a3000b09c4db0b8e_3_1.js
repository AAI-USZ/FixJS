function () {

    // honor max marker limit
    if (this._allRequests.length >= this._markerPoolSize)
      return;

    // Join and sort latitudinally
    this._allRequests = this._closedRequests.concat(this._openedRequests, this._openRequests).sort(function (a, b) {
      var latitudeDiff = b.lat - a.lat;
      if (latitudeDiff) {
        return latitudeDiff;
      }
      else if (a.statusType === "closed" || a.statusType === "opened" && b.statusType !== "closed") {
        return 1;
      }
      else {
        return -1;
      }
    });
    
    // Wait for icons to be ready for rendering
    if (!this._iconsReady()) {
      this._waitingToUpdate = true;
      return;
    }
    
    // var start = Date.now();
    this.canvasTiles.redraw();
    // var time = Date.now() - start;
    // this.renderInfo = this.renderInfo || { renders: 0, total: 0, totalPer: 0, records: []};
    // this.renderInfo.renders += 1;
    // this.renderInfo.total += time;
    // this.renderInfo.totalPer += time / this._allRequests.length;
    // console.log("AVERAGE RENDER TIME PER FEATURE: ", this.renderInfo.totalPer / this.renderInfo.renders);
  }