function() {
    var childEl = document.createElement('div');
    childEl.classList.add('foo');

    el = document.createElement('div');
    document.body.appendChild(el);

    subject = new Calendar.View();

    //we always assume there is some
    //root level element.
    subject.element = el;
  }