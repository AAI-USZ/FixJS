function() {
      models[2] = {
        name: 'second',
        localDisplayed: false,
        _id: 'two'
      };

      assert.equal(children.length, 1);
      store.emit('add', 'two', models[2]);
      assert.equal(children.length, 2);

      assert.equal(children[1].textContent, 'second');
    }