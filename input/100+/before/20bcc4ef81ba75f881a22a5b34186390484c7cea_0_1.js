function(currentEvent) {

      var newEvent;

      newEvent = $.tmpl('eventLog', [{
         Name: currentEvent.name
      }]);
      newEvent.prependTo('#ctracker-event-logs');
      newEvent.click(function() {
        console.log(currentEvent.origin);
      });
      eventLogs++;
    }