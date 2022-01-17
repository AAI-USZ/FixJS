function addEvent(msg, data) {
    var self=this;
    if (self.samplingEnabled === false) return;

    var eventName = getKPIName.call(self, msg, data);
    if (!eventName) return;

    var eventData = [ eventName, new Date() - self.startTime ];
    if (self.samplesBeingStored) {
      var d = model.getCurrent() || {};
      if (!d.event_stream) d.event_stream = [];
      d.event_stream.push(eventData);
      model.setCurrent(d);
    } else {
      self.initialEventStream.push(eventData);
    }
  }