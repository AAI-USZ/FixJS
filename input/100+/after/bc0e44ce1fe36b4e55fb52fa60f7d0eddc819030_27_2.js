function() {
    var calledNext = false;

    var one = new View();
    var two = new View();

    two.active = one.active = true;

    subject._activeObjects.push(one);
    subject._activeObjects.push(two);

    subject._clearObjects({}, function() {
      calledNext = true;
    });

    assert.isTrue(calledNext);
    assert.isFalse(one.active);
    assert.isFalse(two.active);
  }