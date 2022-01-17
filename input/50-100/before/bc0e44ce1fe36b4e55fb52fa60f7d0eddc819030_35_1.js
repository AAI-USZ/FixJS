function() {
    testEl = document.createElement('div');
    testEl.id = 'test';
    document.body.appendChild(testEl);

    controller = createController();

    busytimes = controller.busytime;
    subject = new Calendar.Views.MonthChild({
      controller: controller,
      month: month
    });
  }