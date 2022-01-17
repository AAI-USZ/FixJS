function() {
    el = document.createElement('div');
    el.id = 'view';
    document.body.appendChild(el);

    subject = new Calendar.View('#view');
  }