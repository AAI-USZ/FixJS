function(
    fireEventTracker) {

    var LOGGING_LIMIT = 10,
      removeOverFlowedLogs, fireEventHandler,
      eventLogs = [];

    $('#ctracker-event-logger textarea').textext({ plugins : 'tags' });

    removeOverFlowedLogs = function () {
      if(eventLogs.length > LOGGING_LIMIT) {
        $('#ctracker-event-logger li:last-child').remove();
        eventLogs.pop();
      }
    };

    addNewLog = function(currentEvent) {
    $.tmpl('eventLog', [{
       Name: currentEvent.name
     }]).prependTo('#ctracker-event-logs');
      eventLogs.unshift(currentEvent);
    };

    fireEventHandler = function(currentEvent) {
      addNewLog(currentEvent);
      removeOverFlowedLogs();
    };

    fireEventTracker.setFireEventCallBack(fireEventHandler);

    // $.tmpl('eventLog', [{
    //   Name: "asfasfasdf"
    // }]).appendTo('#ctracker-event-logs');
  }