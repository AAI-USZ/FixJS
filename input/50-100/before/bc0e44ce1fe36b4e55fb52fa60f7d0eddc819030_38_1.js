function() {
    var div = document.createElement('div');
    div.id = 'test';
    div.innerHTML = [
      '<div id="wrapper"></div>',
      '<div id="settings">',
        '<div id="settings-calendars"></div>',
        '<div id="settings-accounts"></div>',
      '</div>'
    ].join('');

    document.body.appendChild(div);

    controller = createController();

    subject = new Calendar.Views.Settings({
      controller: controller
    });
  }