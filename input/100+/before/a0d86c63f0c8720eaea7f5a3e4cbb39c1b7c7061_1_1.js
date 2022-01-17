function() {
    var self;
    self = this;
    self.debug = ko.observable(true);
    self.tool = ko.observable("MOVE");
    self.last_tool = ko.observable("MOVE");
    self.state = ko.observable("BUILD");
    self.isPaused = ko.computed(function() {
      return self.state() === 'PAUSE';
    });
    self.isPlaying = ko.computed(function() {
      return self.state() === 'PLAY';
    });
  }