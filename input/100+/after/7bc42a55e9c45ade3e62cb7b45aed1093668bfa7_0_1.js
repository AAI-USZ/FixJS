function() {
      var manager = manageTextarea(el, {
        text: shouldNotBeCalled,
      });

      manager.select('foobar');

      assert.equal(el.val(), 'foobar');
      el.trigger('keydown');
      assert.equal(el.val(), 'foobar', 'value remains after keydown');

      if (supportsSelectionAPI()) {
        el.trigger('keypress');
        assert.equal(el.val(), 'foobar', 'value remains after keypress');
        el.trigger('input');
        assert.equal(el.val(), 'foobar', 'value remains after flush after keypress');
      }
    }