function() {
    var div = document.createElement('div');
    div.id = 'test';
    div.innerHTML = [
      '<div id="month-view"><div class="monthView"></div>',
      '<div class="monthHeader"></div></div>'
    ].join('');

    document.body.appendChild(div);

    app = testSupport.calendar.app();
    controller = app.timeController;
    busytimes = app.store('Busytime');

    subject = new Calendar.Views.Month({
      app: app,
      monthSelector: '#test .monthView',
      currentMonthSelector: '#test .monthHeader'
    });

  }