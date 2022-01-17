function() {

    var object;

    setup(function() {
      object = {};
    });

    test('with onactive', function() {
      var calledWith;
      object.onactive = function() {
        calledWith = arguments;
        object.onactiveCalled = true;
      }
      subject.mangeObject(object, 'foo');
      assert.ok(object.onactiveCalled);
      assert.equal(subject._activeObjects[0], object);

      assert.equal(calledWith[0], 'foo');
    });

    test('without onactive', function() {
      subject.mangeObject(object);
      assert.ok(!subject.__routerActive);
      assert.equal(subject._activeObjects[0], object);
    });

  }