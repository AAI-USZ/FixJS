function() {
    assert.instanceOf(subject, Calendar.View);
    assert.equal(subject.controller, controller);
    assert.equal(
      subject.element, document.querySelector('#settings')
    );
  }