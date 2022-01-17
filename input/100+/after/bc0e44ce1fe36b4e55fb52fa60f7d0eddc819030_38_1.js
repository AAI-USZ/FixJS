function() {

    var models;
    var children;

    setup(function() {
      models = {};
      // render out one model
      models[1] = {
        name: 'first',
        localDisplayed: true,
        _id: 'one'
      };

      store._cached = models;
      subject.render();
      children = subject.calendars.children;
    });

    test('update', function() {
      var check = children[0].querySelector(
        '*[type="checkbox"]'
      );

      models[1].name = 'foo';
      models[1].localDisplayed = false;

      store.emit('update', 'one', models[1]);

      assert.equal(children[0].textContent, 'foo');
      assert.isFalse(
        check.checked
      );
    });

    test('add', function() {
      models[2] = {
        name: 'second',
        localDisplayed: false,
        _id: 'two'
      };

      assert.equal(children.length, 1);
      store.emit('add', 'two', models[2]);
      assert.equal(children.length, 2);

      assert.equal(children[1].textContent, 'second');
    });

    test('remove', function() {
      store.emit('remove', 'one');
      assert.equal(children.length, 0);
    });

  }