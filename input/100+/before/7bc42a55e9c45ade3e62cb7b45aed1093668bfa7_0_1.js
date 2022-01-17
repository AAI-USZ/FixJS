function() {
      var manager = manageTextarea(el, {
        text: shouldNotBeCalled,
      });

      manager.select('foobar');

      assert.equal(el.val(), 'foobar');
      el.trigger('input');
      assert.equal(el.val(), 'foobar', 'value remains after input');
      el.trigger('keydown');
      assert.equal(el.val(), 'foobar', 'value remains after keydown');
    }