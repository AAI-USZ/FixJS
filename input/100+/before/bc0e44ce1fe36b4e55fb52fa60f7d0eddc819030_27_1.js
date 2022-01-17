function() {
    var view, calledNext, result;

    function callResult(arg) {
      result(arg, function() {
        calledNext = true;
      });
    }

    setup(function() {
      calledNext = false;
      view = new View();
      result = subject._wrapObject(view);
      callResult({});
    });

    test('creating function', function() {
      assert.deepEqual(subject._activeObjects, [
        view
      ]);

      assert.isTrue(view.active);
      assert.isTrue(view.__routerActive);
    });

  }