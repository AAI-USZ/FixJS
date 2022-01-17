function(_super) {

    __extends(EventMonitor, _super);

    EventMonitor.name = 'EventMonitor';

    EventMonitor.prototype.events = [];

    function EventMonitor() {
      var event, _i, _len, _ref;
      _ref = this.events;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        event = _ref[_i];
        if (event in this) {
          this.on(event, this[event]);
        }
      }
    }

    return EventMonitor;

  }