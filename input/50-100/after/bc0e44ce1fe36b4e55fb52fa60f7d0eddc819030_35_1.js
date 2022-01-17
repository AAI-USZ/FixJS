function() {
    testEl = document.createElement('div');
    testEl.id = 'test';
    document.body.appendChild(testEl);

    app = testSupport.calendar.app();
    controller = app.timeController;

    busytimes = app.store('Busytime');
    subject = new Calendar.Views.MonthChild({
      app: app,
      month: month
    });
  }