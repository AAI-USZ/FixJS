function() {
      var parent = Node();
      var one = Node();
      var two = Node();

      one.adopt(parent, 0, 0);
      two.adopt(parent, one, 0);

      two.disown();

      assertSingleChild(parent, one);

      assert.equal(two.parent, parent, 'two retains its parent');
      assert.equal(two.prev, one, 'two retains its prev');

      assert.throws(function() { two.disown(); },
                    'disown fails on a malformed tree');
    }