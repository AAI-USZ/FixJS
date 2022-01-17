function() {
    var div = document.createElement('div');
    div.id = 'test';
    div.innerHTML = [
      '<div id="create-account-view">',
        '<ul id="create-account-presets"></ul>',
      '</div>'
    ].join('');

    document.body.appendChild(div);

    app = testSupport.calendar.app();

    template = Calendar.Templates.Account;
    subject = new Calendar.Views.CreateAccount({
      app: app
    });
  }