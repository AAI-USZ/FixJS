function() {
    var div = document.createElement('div');
    div.id = 'test';
    div.innerHTML = [
      '<div id="wrapper"></div>',
      '<div id="settings">',
        '<ul class="calendars"></ul>',
      '</div>'
    ].join('');

    document.body.appendChild(div);

    app = testSupport.calendar.app();
    controller = app.timeController;
    store = app.store('Calendar');
    template = Calendar.Templates.Calendar;

    subject = new Calendar.Views.Settings({
      app: app
    });
  }