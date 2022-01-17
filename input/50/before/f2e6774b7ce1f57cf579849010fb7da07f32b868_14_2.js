function() {
    var el = document.querySelector('#test .monthView');

    assert.equal(
      subject.monthsDisplayElement(),
      el
    );
  }