function() {
    var div = document.createElement('div');
    div.id = 'test';
    div.innerHTML = [
      '<div id="months-day-view"> <div class="dayHeader"></div>',
      '<div class="eventList"></div></div>'
    ].join(' ');

    document.body.appendChild(div);

    app = testSupport.calendar.app();
    controller = app.timeController;
    events = app.store('Event');


    subject = new Calendar.Views.MonthsDay({
      app: app,
      headerSelector: '#test .dayHeader',
      eventsSelector: '#test .eventList'
    });
  }