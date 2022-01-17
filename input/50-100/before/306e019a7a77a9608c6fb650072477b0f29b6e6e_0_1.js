function(event) {
      var $this = $(this);
      var events = $this.data('eventStack').events;

      var pos = $.inArray(event, events);
      events.splice(pos, 1);
    }