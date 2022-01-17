function() {
    $.template('mainPanel',
      '<canvas id="ctracker-events-per-second-gauge"></canvas>'+
      '<div id="ctracker-event-listener-chart-container">' +
        '<div id="ctracker-event-listener-chart"></div>'+
      '</div>' +
      '<div id="ctracker-event-type-chart"></div>' +
      '<div id="ctracker-event-logger">' +
        '<textarea rows="1"></textarea>' +
        '<div><ul id="ctracker-event-logs"></ul></div>'+
      '</div>'
     );

    $.template( "eventLog", '<li><b>${Name}</b></li>' );
  }