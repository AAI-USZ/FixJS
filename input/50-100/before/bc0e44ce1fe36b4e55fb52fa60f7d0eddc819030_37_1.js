function() {
    var div = document.createElement('div');
    div.id = 'test';
    div.innerHTML = [
      '<div id="months-day-view"> <div class="dayHeader"></div>',
      '<div class="eventList"></div></div>'
    ].join(' ');

    document.body.appendChild(div);

    controller = createController();
    events = controller.eventList;


    subject = new Calendar.Views.MonthsDay({
      controller: controller,
      headerSelector: '#test .dayHeader',
      eventsSelector: '#test .eventList'
    });
  }