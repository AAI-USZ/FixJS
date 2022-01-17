function() {
    assert.equal(subject.monthSelector, '#test .monthView');
    assert.equal(subject.currentMonthSelector, '#test .monthHeader');
    assert.instanceOf(subject, Calendar.Responder);
    assert.equal(subject.controller, controller);
  }