function (data) {
    var self = this;
    $.extend(self, data);

    self.performanceTime = new Date(data.performanceTime);
    self.scoringComplete = ko.observable(self.scoringComplete);
    self.didNotCompete = ko.observable(self.didNotCompete);

    self.didCompete = ko.computed(function () {
        return !self.didNotCompete();
    }, self);

    self.scoringIsNotComplete = ko.computed(function () {
        return !self.scoringComplete();
    }, self);
}