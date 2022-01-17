function(options) {
    var self = this;

    self.options = options;
    self.type = ko.observable("go");
    self.errorMessage = ko.observable("");
    self.pipelines = ko.observableArray();

    self.poll = function() {
      Radiator.MonitorStore.findById(self.options.id, function(data) {
        self.errorMessage("");
        _(data).each(function(pipeline) {
          var existing_pipeline = _(self.pipelines()).find(function(p) { return p.name() == pipeline.name; });
          if(existing_pipeline) {
            existing_pipeline.refresh(pipeline);
          } else {
            self.pipelines.push(new Radiator.Pipeline(pipeline));
          }
        });
      }, function(error) {
        self.errorMessage(error.message);
      });
    }

    self.start = function() {
      self.poll();
      setInterval(self.poll, parseInt(self.options.refresh_rate) * 1000);
    };

    return {
      start: self.start,
      pipelines: self.pipelines,
      errorMessage: self.errorMessage,
    }
  }