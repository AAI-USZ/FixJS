function() {
    var self = this;

    var tempData = [];
    for (var i = 0; i < self.newOverlays.length; i++) {
        tempData.push(self.newOverlays[i].getPointsJSON());
    }

    return tempData;
}