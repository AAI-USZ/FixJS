function() {
    assert.equal(subject.monthSelector, '#test .monthView');
    assert.equal(subject.currentMonthSelector, '#test .monthHeader');
    assert.instanceOf(subject, Calendar.View);
    assert.equal(subject.controller, controller);
    assert.equal(subject.element, document.querySelector('#month-view'));
  }