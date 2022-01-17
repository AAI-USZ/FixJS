function (canvas, tilePoint, zoom) {
    if (!this.dataSource)
      return;
    
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 256, 256);
    
    var showTypes = {
      open: this.dataSource.filterConditions.states.indexOf("open") > -1,
      opened: this.dataSource.filterConditions.states.indexOf("opened") > -1,
      closed: this.dataSource.filterConditions.states.indexOf("closed") > -1
    };
    
    var tilePixelPoint = tilePoint.multiplyBy(256);
    var tileKey = tilePoint.toString();
    this._createEmptyFeatureTile(tileKey);
    this._allRequests.forEach(function (request, index) {
      if (showTypes[request.statusType]) {
        var icon = this.icons[request.statusType];
        var point = this.map.project(new L.LatLng(request.lat, request.long))._round()._subtract(tilePixelPoint);
        if (point.x > -15 && point.x < 270 && point.y > -41 && point.y < 296) {
          ctx.drawImage(icon.image, point.x + icon.offset.x, point.y + icon.offset.y);
          this._setFeatureAtPoint(tileKey, point, icon, request, index);
        }
      }
    }, this);
  }