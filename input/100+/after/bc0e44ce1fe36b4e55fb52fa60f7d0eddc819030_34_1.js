function() {

    test('when an account is added', function() {
      var store = app.store('Account');
      var renderCalled = false;
      subject.render = function() {
        renderCalled = true;
      }

      store.emit('add');

      assert.equal(renderCalled, true);
    });

    test('when an account is removed', function() {
      var store = app.store('Account');
      var renderCalled = false;
      subject.render = function() {
        renderCalled = true;
      }

      store.emit('remove');

      assert.equal(renderCalled, true);
    });


  }