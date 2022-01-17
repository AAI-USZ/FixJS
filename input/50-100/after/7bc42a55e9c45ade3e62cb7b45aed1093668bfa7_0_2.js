function() {
      var manager = manageTextarea(el, {
        text: shouldNotBeCalled,
      });

      manager.select('foobar');
      el.trigger('blur');
      el.focus();

      // IE < 9 doesn't support selection{Start,End}
      if (supportsSelectionAPI()) {
        assert.equal(el[0].selectionStart, 0, 'it\'s selected from the start');
        assert.equal(el[0].selectionEnd, 6, 'it\'s selected to the end');
      }

      assert.equal(el.val(), 'foobar', 'it still has content');
    }