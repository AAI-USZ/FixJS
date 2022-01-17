function (data) {
    var self = this;
    $.extend(self, data);

    self.performanceTime = new Date(data.performanceTime);

    self.didCompete = ko.computed(function () {
        return !self.didNotCompete;
    }, self);

    self.scoringIsNotComplete = ko.computed(function () {
        return !self.scoringComplete;
    }, self);
}