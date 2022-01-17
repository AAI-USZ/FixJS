function() {
      var tpl = new Template(
        '{2} ! {1}'
      );
      assert.equal(tpl.render({1: '1', 2: '2'}), '2 ! 1');
    }