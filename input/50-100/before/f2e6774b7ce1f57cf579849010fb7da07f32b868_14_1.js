function() {
    var div = document.createElement('div');
    div.id = 'test';
    div.innerHTML = [
      '<div class="monthView"></div>',
      '<div class="monthHeader"></div>'
    ].join('');

    document.body.appendChild(div);

    controller = createController();

    busytimes = controller.busytime;

    subject = new Calendar.Views.Month({
      controller: controller,
      monthSelector: '#test .monthView',
      currentMonthSelector: '#test .monthHeader'
    });

  }