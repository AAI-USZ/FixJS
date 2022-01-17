function() {
    assert.equal(subject.headerSelector, '#test .dayHeader');
    assert.equal(subject.controller, controller);
    assert.instanceOf(subject, Calendar.View);
    assert.equal(subject.element, document.querySelector('#months-day-view'));
  }