function() {
    var self = this;

    var pointsArray = [];
    for (i = 0; i < self.points.length; i++) {
        var temp = {};
        temp.x = self.points[i].x;
        temp.y = self.points[i].y;

        pointsArray.push(temp);
    }
    return pointsArray;
}