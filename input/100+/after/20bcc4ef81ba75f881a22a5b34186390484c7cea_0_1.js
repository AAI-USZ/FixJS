function(currentEvent) {

      var newEvent, exclusionList;

      exclusionList = [];
      $('#ctracker-event-logger .text-label').each(function(index, value) {
        exclusionList.push($(value).text());
      });

      if ($.inArray(currentEvent.name, exclusionList) === -1) {
        newEvent = $.tmpl('eventLog', [{
           Name: currentEvent.name
        }]);
        newEvent.prependTo('#ctracker-event-logs');
        newEvent.click(function() {
          console.log(currentEvent.origin);
        });
        eventLogs++;
      }
    }