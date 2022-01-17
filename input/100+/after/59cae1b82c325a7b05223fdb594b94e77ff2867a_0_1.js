function(options) {
    var self = this;

    self.options = options;
    self.type = ko.observable("foo");
    self.pipelines = ko.observableArray();

    self.start_polling = function() {
      setInterval(function() {
        Radiator.MonitorStore.findById(self.options.id, function(data) {
          _(data).each(function(pipeline) {
            _(self.pipelines()).each(function(existing_pipeline) {
              if(existing_pipeline.name() == pipeline.name) {
                existing_pipeline.refresh(pipeline);
              }
            });
          });
        }, screen.showError);
      }, parseInt(self.options.refresh_rate) * 1000)
    };

    self.start = function() {
      Radiator.MonitorStore.findById(self.options.id, function(data) {
        _(data).each(function(pipeline) {
          self.pipelines.push(new Radiator.Pipeline(pipeline));
        });
      }, screen.showError);
      self.start_polling();
    };

    return {
      start: self.start,
      pipelines: self.pipelines,
    }
  }