function(event) {
      var $this = $(this);
      var events = $this.data('eventStack').events;

      var pos = $.inArray(event, events);
      if (pos === -1) {
        throw 'EventStack: event given not found on stack.';
      }

      events.splice(pos, 1);
    }